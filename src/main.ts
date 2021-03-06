import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import dotenv from 'dotenv';

dotenv.config();
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
  });

  app.listen(() => logger.log('Tanbot is ready to destroy Tan!'));
}

bootstrap();
