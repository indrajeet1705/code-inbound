import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, UserLoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login( @Body() UserLoginDto:UserLoginDto){
    return await this.authService.login(UserLoginDto);
  }
  @Post('register')
  async register( @Body() registerUserDto:RegisterUserDto){
    return await this.authService.register(registerUserDto);
  }
}
