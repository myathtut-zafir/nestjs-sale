import { Injectable } from '@nestjs/common';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Category } from 'src/category/entities/category.entity';

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
    console.log(categoryId);
    const product = this.productRepository.create({
      ...productDetails,
      category: { id: categoryId },
    });
    return this.productRepository.save(product);
  }
}
