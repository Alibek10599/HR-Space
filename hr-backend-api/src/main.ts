import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { Env } from './core/utils/env';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: Env.readString('HR_SERVICE_URL'),
    package: 'hr',
    protoPath: join(__dirname, '../proto/hr.proto'),
  },
};

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  app.useGlobalFilters(new HttpExceptionFilter()); // TODO: resolve filter and pipe to make proper connection between services
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}

bootstrap().then(() => console.log('HR service started'));
