// user.controller.ts
import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getalluser')
  getAllUser():Promise<User[]>{
    return this.userService.findAll();
  }
 
  @Post('/adduser')
  async createUser(@Body() user: any) {
    return this.userService.createUser(user);
  }
 
  @Put('/update/user/:id')
  async updateUser(@Body() user:any, @Param('id') id:any){
     return this.userService.updateUser(user, id)
  }

  @Delete('/delete/user/:id')
  deleteUser(@Param('id') id:any):Promise<string>{
    return this.userService.deleteUser(id);
  }
  
  @Get('/find/by/email/:email')
  getUserByEmail(@Param('email') email:string):Promise<User>{
    return this.userService.findByEmail(email)
  }
}
