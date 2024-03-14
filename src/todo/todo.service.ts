import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from 'src/user/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(createTodoDto: any, id: number): Promise<Todo> {
    const todo: Todo = new Todo(createTodoDto);
    todo.Completed = false;
    todo.Date = new Date().toLocaleDateString();
    const Mainuser: User = await this.userService.findById(id);
    todo.user = Mainuser;
    return this.todoRepository.save(todo);
  }

  async findALLTodosByUserIDCompletedFalse(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, Completed: false },
    });
  }

  async findALLTodosByUserIDCompletedtrue(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, Completed: true },
    });
  }

  async complteteUpdate(todoId: number): Promise<string> {
    const todoCompleteStatus = (await this.todoRepository.findOneById(todoId))
      .Completed;
    await this.todoRepository.update(todoId, {
      Completed: !todoCompleteStatus,
    });
    return 'Completed Update';
  }

  async remove(todoId: number): Promise<string> {
    try {
      await this.todoRepository.delete(todoId);
      return `delete todo`;
    } catch (error) {
      return `${error}`;
    }
  }
}
