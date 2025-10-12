import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { AuthUserDto } from 'src/iam/dtos/auth-user.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @Post('create')
  create(
    @Body() createProductDto: CreateProductDto,
    @Request() req: { user: AuthUserDto },
  ) {
    return this.productService.create(createProductDto, req.user);
  }
}
