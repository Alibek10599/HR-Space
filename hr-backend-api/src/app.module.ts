import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from 'src/app/config/configuration';
import { Env } from 'src/core/utils/env';
import { EmployeeModule } from './app/employee/employee.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'nestjs-http-exception-filter';
import { MilitaryModule } from './app/military/military.module';
import { EducationModule } from './app/education/education.module';
import { DocumentsModule } from './app/documents/documents.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
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
    AuthModule,
    SequelizeModule.forRootAsync({
      imports: [
        ConfigModule,
        EmployeeModule,
        MilitaryModule,
        EducationModule,
        DocumentsModule,
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<SequelizeModuleOptions>('database'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
