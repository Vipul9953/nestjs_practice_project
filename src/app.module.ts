import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [UserModule, TodoModule, TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
    DatabaseModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
