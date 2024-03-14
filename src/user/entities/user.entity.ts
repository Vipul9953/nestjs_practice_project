import { Todo } from 'src/todo/entities/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  Role: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
