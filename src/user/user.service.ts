// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { User } from './entities/user.entity';
import { CONSTAINTS } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  get():string{
    return "work"
  }

  async createUser(user: any): Promise<User> {
    const newUser = new User(user);
    newUser.Role = CONSTAINTS.ROLE.NORMALUSER; 
    return await this.userRepository.save(newUser);
  }

  async updateUser(user: any, id: any): Promise<User | undefined> { 
    let dbUser = await this.userRepository.findOneById(id);
   
    if (dbUser) { 
      dbUser.email = user.email; 
      dbUser.firstName = user.firstName;
      dbUser.lastName = user.lastName;
      dbUser.password = user.password;
      await this.userRepository.save(dbUser);  
      return dbUser;
    } else { 
      return undefined; 
    }
  }
  

  async deleteUser(id:any):Promise<string>{ 
    const user = await this.userRepository.delete(id); 
    return "user delete"
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findByEmail(email:string){
    return this.userRepository.findOneOrFail({where:{email:email}});
  }

  findById(id:number):Promise<User>{
    return this.userRepository.findOneById(id);
  }

  

  
}
