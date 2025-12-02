import { Injectable } from '@nestjs/common';
import {  UserLoginDto,LoginResponseDto, RegisterUserDto, RegisterResponseDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService:UserService,
    private jwtService :JwtService
  ){}
  async login( userLoginDto:UserLoginDto) :Promise<LoginResponseDto|undefined>{
    try {
      
      const { email,password}= userLoginDto;
  
      const user = await this.userService.findByEmail(email);
      const passwordMatch =  await bcrypt.compare(password,user?.password);
      if(!user || !passwordMatch){
        return{ success:false,message:'Invalid credentials'};
      }
      const playload = { sub :user.email, userId:user.id};
      const token = await this.jwtService.signAsync(playload);
      return {
        success:true,
        message:'Login successful',
        token
      }
    } catch (error) {
      throw new Error('Login failed');
      
    }

  }
  async register(registerUserDto :RegisterUserDto): Promise<RegisterResponseDto | undefined>{
    try {
      const {email} = registerUserDto;
    const existingUser  = await this.userService.findByEmail(email)
      if(existingUser){
        return{ success:false,message:'User already exists'}
      }
     const passwordHash = await bcrypt.hash(registerUserDto.password,10);
     const newUser = await this.userService.create({
      ...registerUserDto,
      password:passwordHash
     })
     if(!newUser){
      return { success:false,message:'User registration failed'};
     } 
     const playload = { sub :newUser.email, userId:newUser.id};
     const token = await this.jwtService.signAsync(playload);
     return {
      success:true,
      message:'Registration successful',
      token
     }
  
    } catch (error) {
      throw new Error('Registration failed');
    }
    
  }
}
