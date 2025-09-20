import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/products.entity';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...productDetails } = createProductDto;
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      throw new NotFoundException(`Category with id #${categoryId} not found`);
    }
    const product = this.productRepository.create({
      ...productDetails,
      category,
    });
    return this.productRepository.save(product);
  }
}
