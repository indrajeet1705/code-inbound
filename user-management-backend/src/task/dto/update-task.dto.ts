import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title?: string | undefined;
  status?: 'pending' | 'in_progress' | 'completed';
}
