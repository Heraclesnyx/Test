import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { UserController } from './user/user.controller';

//Il s'agit d'un décorateur
@Module({
  imports: [UserModule, PostModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
