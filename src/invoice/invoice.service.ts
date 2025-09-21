import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice_detail.entity';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/products.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceDetail)
    private readonly invoiceDetailRepository: Repository<InvoiceDetail>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create({
      ...createInvoiceDto,
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);

    const invoiceDetailsPromises = createInvoiceDto.invoiceDetail.map(
      async (detailDto) => {
        const invoiceDetail = this.invoiceDetailRepository.create({
          ...detailDto,
          invoice: savedInvoice,
        });
        return this.invoiceDetailRepository.save(invoiceDetail);
      },
    );

    await Promise.all(invoiceDetailsPromises);

    // After saving the invoice and its details, fetch the invoice again with relations
    const finalInvoice = await this.invoiceRepository.findOne({
      where: { id: savedInvoice.id },
      relations: ['customer', 'user', 'invoiceDetail', 'invoiceDetail.product'],
    });

    if (!finalInvoice) {
      throw new NotFoundException(
        `Invoice with ID ${savedInvoice.id} not found after creation`,
      );
    }
    return finalInvoice;
  }
}
