import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import { createPostDto } from './dto/createPostDto';
import { Posts } from '@prisma/client';

// typage dynamique{id: number} et opposé à Omit;

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() data: createPostDto): Promise<Posts> {
    const user = this.userService.findOne(data.authorId);

    if (!user) throw new Error('User not found');
    return this.postService.create(data);
  }

  @Get()
  async findAll(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Posts> {
    const post = await this.postService.findOne(+id);

    if (!post) throw new Error('Post not found');
    return post;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: createPostDto,
  ): Promise<Posts> {
    const post = this.postService.update(id, data);

    if (!post) throw new Error('Post not found');
    return post;
    // this.postService.update(+id, data);
    // return this.postService.updatePost(
    //   +id,
    //   //content, title, +authorId);
    //   body,
    // );
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return this.postService.delete(id);
    // const index = this.postService.findIndexById(+id);
    // if (index === -1) {
    //   throw new Error('Post not found');
    // }
    // return this.postService.deletePost(+id);
  }

  //   @Post()
  //   createPostsController(@Body() body: PostWithoutId): CreatePost {
  //     //Vérification que authorId est bien un user?
  //     const user = this.userService.findOne(body.authorId);
  //     if (!user) {
  //       // user===null || user===undefined || user===false
  //       throw new Error('User not found');
  //     }
  //     //Création d'un post
  //     const post = this.postService.createPost(body);
  //     //Retourner l'auteur avec les posts
  //     return {
  //       data: {
  //         post: {
  //           ...post,
  //           userName: `${user.firstname} ${user.lastname}`,
  //         }, // == a la const post
  //         // user,
  //       },
  //     };
  //   }
}
