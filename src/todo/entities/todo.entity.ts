import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Title: string;

  @Column()
  Date: string;

  @Column()
  Completed: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  constructor(partial: Partial<Todo>) {
    Object.assign(this, partial);
  }
}
