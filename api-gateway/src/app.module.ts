import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import configuration from 'src/config/configuration';
import { Env } from 'src/core/utils/env';
import { HrModule } from './hr/hr.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [
        Env.readString('NODE_ENV', '')
          ? `.env.${Env.readString('NODE_ENV', '')}`
          : null,
        '.env',
        '.sample.env',
      ].filter(Boolean),
      expandVariables: true,
    }),
    HrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
