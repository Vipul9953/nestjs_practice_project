import { Controller, Get, Post, Body,  Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/create/:id')
  create(@Body() createTodoDto: CreateTodoDto, @Param('id') id:number):Promise<Todo> { 
    return this.todoService.create(createTodoDto, id);
  }



  @Get('/alltodos/:id')
  findAllTodosByUserIdCompletedFalse(@Param('id') id:number):Promise<Todo[]> {
    return this.todoService.findALLTodosByUserIDCompletedFalse(id);
  }

  @Get('/alltodoscomplete/:id')
  findAllTodosByUserIdCompletedTrue(@Param('id') id:number):Promise<Todo[]> {
    return this.todoService.findALLTodosByUserIDCompletedFalse(id);
  }

  
  @Put('/update/todocomplete/:id')
  update(@Param('id') todoId: number):Promise<String>{
   return   this.todoService.complteteUpdate(Number(todoId))
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
