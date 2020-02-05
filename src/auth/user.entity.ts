import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TaskEntity } from '../task/task.entity';

@Entity('user')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => TaskEntity, task => task.user, { eager: true, onDelete: 'CASCADE' })
  tasks: TaskEntity[];

  async validatePassword(password: string, pepper: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt + pepper);
    return hash === this.password;
  }
}
