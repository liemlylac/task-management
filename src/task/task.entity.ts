import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity('task')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}
