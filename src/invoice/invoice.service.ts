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
    // const customer = await this.customerRepository.findOne({
    //   where: { id: createInvoiceDto.customerId },
    // });
    // if (!customer) {
    //   throw new NotFoundException(
    //     `Customer with ID ${createInvoiceDto.customerId} not found`,
    //   );
    // }

    const user = await this.userRepository.findOne({
      where: { id: createInvoiceDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createInvoiceDto.userId} not found`,
      );
    }

    const invoice = this.invoiceRepository.create({
      ...createInvoiceDto,
      // customer: customer,
      user: user,
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);

    const invoiceDetailsPromises = createInvoiceDto.invoiceDetail.map(
      async (detailDto) => {
        const product = await this.productRepository.findOne({
          where: { id: detailDto.productId },
        });
        if (!product) {
          throw new NotFoundException(
            `Product with ID ${detailDto.productId} not found`,
          );
        }

        const invoiceDetail = this.invoiceDetailRepository.create({
          ...detailDto,
          invoice: savedInvoice,
          product: product,
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
