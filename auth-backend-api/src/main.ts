import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { RpcFilter } from './app/auth/filter/rpc-exception.filter';
import { Env } from './core/utils/env';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: Env.readString('AUTH_SERVICE_URL'),
    package: 'auth',
    protoPath: join(__dirname, '../proto/auth.proto'),
  },
};

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  app.useGlobalFilters(new RpcFilter()); // TODO: resolve filter and pipe to make proper connection between services
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}

bootstrap();
