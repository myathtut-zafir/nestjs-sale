import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { HashingService } from './hashing.service';
import { BcryptService } from './bcrypt.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    JwtStrategy,
  ],
  exports: [HashingService],
})
export class AuthModule {}
