import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class verifyOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  otp: string;
}
