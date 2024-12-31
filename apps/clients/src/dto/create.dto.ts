import { IsEmail, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
