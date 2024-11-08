import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //création d'un nouvel objet nest stocker dans une variable
  const app = await NestFactory.create(AppModule);
  //Ajout des middleware

  //console.log(app)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
