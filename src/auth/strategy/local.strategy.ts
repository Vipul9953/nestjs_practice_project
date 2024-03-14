import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    console.log('line1 7', email);

    const user = await this.userService.findByEmail(email);
    if (user && user.password == password) return user;
    if (user == undefined) throw new UnauthorizedException('user is not found');
    if (user.password != password)
      return new UnauthorizedException('Inavlid Password');
  }
} 