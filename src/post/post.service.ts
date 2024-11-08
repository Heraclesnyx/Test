import { Injectable } from '@nestjs/common';
import { createPostDto } from './dto/createPostDto';
import { PrismaService } from 'prisma/prisma.service';
import { Posts } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createPostDto): Promise<Posts> {
    //Destructuring pour extraire des données (ici authorId)
    const { authorId, ...body } = data; //On extrait authorId de data
    return this.prisma.posts.create({
      data: {
        ...body, //Remplace tout les champs de body, on récupére ici title et content tout en excluant authorId
        author: {
          connect: { id: data.authorId },
        },
      },
    });
  }

  //Méthode pour récupérer tous les articles d'un user
  // getPostsByUser(authorId: number): Posts[] {
  //   return this.posts.filter((post) => post.authorId === authorId);
  // }

  //Méthode pour récupérer tous les articles d'un user nouvelle Méthode
  async findAll(): Promise<Posts[]> {
    return this.prisma.posts.findMany({
      include: {
        author: true,
      },
    });
  }

  async findOne(id: number): Promise<Posts> {
    return this.prisma.posts.findUnique({
      //where pour filtrage sur un id par exemple
      where: { id },

      //include pour extraire toute les informations d'une relation
      include: {
        // author: true, //ici on affiche tout les résultats
        author: {
          //Afficher juste les information que l'on souhaite (ici firstname,lastname et email)
          select: {
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });
    // return this.posts.find((post) => post.id === id);
  }

  async update(id: number, data: Partial<createPostDto>): Promise<Posts> {
    return this.prisma.posts.update({ where: { id }, data });
    // const post = this.findById(id);

    // if (!post) {
    //   throw new Error('Post not found');
    // }
    // post.content = data.content;
    // post.title = data.title;
    // post.authorId = data.authorId;
    // return post;
  }

  async delete(id: number): Promise<Posts> {
    return this.prisma.posts.delete({ where: { id } });
  }
}
