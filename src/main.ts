import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('CLIENT_URI'),
    methods: 'GET,POST,PUT,DELETE',
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
