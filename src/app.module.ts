import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import { IsExistConstraint } from './validation/is-exist.validator';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'mht',
      password: '12345678',
      database: 'sale',
      autoLoadEntities: true,
      synchronize: true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    UserModule,
    IamModule,
    ProductModule,
    CategoryModule,
    InvoiceModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsExistConstraint],
})
export class AppModule {}
