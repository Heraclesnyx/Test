import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { createUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createUserDto): Promise<User> {
    //Attend tjr un objet data pour create,update
    //where == filtrage
    //select == selection des colonnes

    //Ma first méthode pour mettre en place le bcrypt, beaucoup plus de ligne
    //Je commence par créer un salt
    // const salt = await bcrypt.genSalt();

    //Je hash mon mot de passe
    // const hashedPassword = await bcrypt.hash(data.password, salt);

    //On extrait password de data dans une variabe destructuré
    // const { password, ...body } = data;

    //Version Refactoring. Plus cours et moins de ligne pour le mettre en place.
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.create({
      data,
      //  {
      //   ...body,
      //   password: await bcrypt.hash(data.password, salt),
      // },
    });
  }

  //Se renseigner sur les skip,take,cursor....
  //Afficher tous les users avec prisma
  async findAll(): Promise<User[]> {
    // const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany();
  }

  //Utile pour filtrer dans le controlleur prendre ceux qu'on a besoin pour la pagination entre skip,cursor,take....
  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<createUserDto>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
    // const user = this.findById(id);

    // if (!user) {
    //   throw new Error('User not found');
    // }
    // user.email = data.email;
    // user.password = data.password;
    // user.firstname = data.firstname;
    // user.lastname = data.lastname;
    // return user;
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
