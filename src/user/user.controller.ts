import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
// import { UserWithoutId } from './entities/user.class';
import { createUserDto } from './dto/createUserDto';

// export interface createUserInterface {
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
// }

//Tout prendre pour typage en ommettant un attribut et donc pas besoin de faire une interface
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    // @Req() req: any,
    @Body() data: createUserDto,
    // @Param() param: any,
    // @Query() query: any,
  ): Promise<User> {
    return this.userService.create(data);
  }

  //Chercher par id (= 1 résultat)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    const user = await this.userService.findOne(+id);

    if (!user) throw new Error('User not found');
    return this.userService.findOne(+id);
  }

  @Get()
  //Tout récupérer
  //Système de pagination à l'aide de take et skip
  async findAll() // @Query() query: { skip: string; take: string },
  : Promise<User[]> {
    return this.userService.findAll();
    // { take: +query.take, skip: +query.skip });
  }
  // readController(): User[] {
  //   return this.userService.read();
  // }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(+id);

    //si il ne trouve pas l'id d'un user dans le tableau alors il renvoie message erreur
    if (!user) {
      throw new Error('User not found');
    }
    return this.userService.delete(+id);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() data: createUserDto,
    // params: {
    //   where: Prisma.UserWhereUniqueInput;
    //   data: Prisma.UserUpdateInput;
    // },
    // @Param('id') id: string,
    // @Body('email') email: string,
    // @Body('password') password: string,
    // @Body('firstname') firstname: string,
    // @Body('lastname') lastname: string,
    // @Body() body: UserWithoutId,
  ): Promise<User> {
    // const { where, data } = params;
    return this.userService.update(+id, data);
    // +id,
    // body,
    // email,
    // password,
    // firstname,
    // lastname,
  }
}
