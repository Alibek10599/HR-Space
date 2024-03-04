import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [EmailService, ConfigService],
  controllers: [EmailController],
})
export class EmailModule {}
