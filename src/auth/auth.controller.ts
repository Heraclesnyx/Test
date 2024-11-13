import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  bcrypt: any;
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  //signin

  //signup
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    //Vérification si email existe

    const user = await this.userService.getByEmail(body.email);
    if (user) {
      throw new BadRequestException('bad credentials');
    }

    //Hash du password
    body.password = await this.authService.hash(body.password);

    //Create user
    const new_user = await this.userService.create(body);

    // Envoi du mail

    //return de tout ca { user }
    return { user: new_user };
  }

  @Post('signin')
  async signin(@Body() body: SigninDto) {
    //Chercher user depuis body.email
    const user = await this.userService.getByEmail(body.email);

    //Check user
    if (!user) {
      throw new BadRequestException('bad credentials');
    }
    //Compare password
    const compare = await this.authService.compare(
      body.password,
      user.password,
    );

    if (!compare) {
      throw new BadRequestException('bad credentials');
    }

    //Create access_token
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        firstname: user.firstname,
      }),
    };
    //renvoie le tout
  }
}
