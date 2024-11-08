import { IsNotEmpty, Length, IsString } from '@nestjs/class-validator';
import { IsEmail } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;
}
