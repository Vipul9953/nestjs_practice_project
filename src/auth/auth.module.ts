// import { Module } from '@nestjs/common';
// import { Passport } from 'passport';
// import { UserModule } from 'src/user/user.module';
// import { LocalStrategy } from './strategy/local.strategy';
// import { AuthController } from './auth.controller';

// @Module({
//   imports: [Passport, UserModule],
//   controllers: [AuthController],
//   providers: [LocalStrategy],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [LocalStrategy],
})
export class AuthModule {}