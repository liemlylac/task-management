import { TaskEntity } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        return await query.getMany();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const { title, description } = createTaskDto;

        const task = this.create();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await this.save(task);

        return task;
    }
}
