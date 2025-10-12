import { IsEmail, IsInt } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  email: string;

  @IsInt()
  userId: number;
}
