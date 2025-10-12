import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashingService } from 'src/auth/hashing.service';
import { LoginDto } from 'src/iam/dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashingService: HashingService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      const user = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = await this.hashingService.hashPassword(
        createUserDto.password,
      );

      return this.userRepository.save(user);
    } catch (error) {
      const pgUniqueViolaitonErrorCode = '23505';
      if (error.code === pgUniqueViolaitonErrorCode)
        throw new ConflictException();
      throw error;
    }
  }
  async login(loginDto: LoginDto) {
    const getUser = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!getUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordTrue = await this.hashingService.comparePassword(
      loginDto.password,
      getUser.password,
    );
    if (!isPasswordTrue) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const payload = { email: getUser.email, sub: getUser.id };
    const tokens = this.getTokens(payload);
    return tokens;
  }
  getTokens(payload: { email: string; sub: number }) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const refreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') || jwtSecret;

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: jwtSecret,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: refreshSecret,
      }),
    };
  }
}
