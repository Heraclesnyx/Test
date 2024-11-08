import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [UserModule],
})
export class PostModule {}
