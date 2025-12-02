import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto{
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email:string;
  @IsNotEmpty()
  @IsString()
  password:string;
}

export class LoginResponseDto{
  success:boolean;
  message:string;
  token?:string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  name:string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email:string;
  @IsNotEmpty()
  @IsString()
  password:string;

}
export class RegisterResponseDto{
  success:boolean;
  message:string;
  token?:string;
}