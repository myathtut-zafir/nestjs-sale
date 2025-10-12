import { Injectable } from '@nestjs/common';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Category } from 'src/category/entities/category.entity';
import { AuthUserDto } from 'src/iam/dtos/auth-user.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto, user: AuthUserDto) {
    const { categoryId, ...productDetails } = createProductDto;
    console.log(categoryId);
    const product = this.productRepository.create({
      ...productDetails,
      category: { id: categoryId },
      user: { id: user.userId },
    });
    return this.productRepository.save(product);
  }
}
