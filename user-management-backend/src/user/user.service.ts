import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ){}

  
  async create( registerUserDto:RegisterUserDto)  {
    const newuser = this.userRepository.create(registerUserDto);
    return await this.userRepository.save(newuser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(+id);
  }
  async findByEmail( email:string){
    return await this.userRepository.findOne({where:{email}})
  }
}
