import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';

//Il s'agit d'un décorateur
@Module({
  imports: [UserModule, PostModule, AuthModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
