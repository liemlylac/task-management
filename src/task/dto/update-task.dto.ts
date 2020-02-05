import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateTaskDto {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  status: TaskStatus;
}
