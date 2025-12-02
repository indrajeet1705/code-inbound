import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository : Repository<Task>,
    private readonly userService : UserService
  ){}
  async create(createTaskDto: CreateTaskDto,user:any) {
   try {
    console.log("In create Task Service",user)
     const  userInfo = await this.userService.findByEmail(user?.email);
     if(!userInfo) return {success:false,message:'Unauthorized'};
    
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user:userInfo,
      userId:userInfo.id,

    });
    console.log(newTask)
    const createdTask =await this.taskRepository.save(newTask)
    console.log(createdTask)
    return {success:true,message:'Task created successfully'}
   } catch (error) {
    return {success:false,message:'Error creating task'}
   }
  }

  async findAll() {

    try {
      const tasks: Task[] = await this.taskRepository.find();
      return tasks;
    } catch (error) {
     return{ success:false,message:'Error fetching tasks'}      
    }
  }

  async findOne(id: number) {
    try {
      const task:Task | null= await this.taskRepository.findOne({where:{id}});
      return task;
    } catch (error) {
      return {success:false,message:'Error fetching task'}
    };
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      await this.taskRepository.update( id,updateTaskDto);
      return {success:true,message:'Task updated successfully'}
    } catch (error) {
      return {success:false,message:'Error updating task'}
    };
  }

  async remove(id: number) {
    try {
      await this.taskRepository.delete(+id);
      return {success:true,message:'Task deleted successfully'}
    } catch (error) {
     return{ success:false,message:'Error deleting task'} 
    }
  }
  async findTasksByUserId(user:any) {
    try {
      console.log(user)
      const Tasks: Task[] = await this.taskRepository.find({ where:{userId:+user.id}})
      
      return Tasks;
    } catch (error) {
      console.log(error.message)
      return {success:false,message:'Error fetching user tasks'}
    }

  }
}
