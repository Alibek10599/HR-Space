import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HR_SERVICE_NAME, HR_PACKAGE_NAME } from 'src/grpc/hr.pb';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';

@Global()
@Module({
  controllers: [HrController],
  providers: [HrService],
  exports: [HrService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: HR_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('grpc.hr_url'),
            package: HR_PACKAGE_NAME,
            protoPath: 'proto/hr.proto',
          },
        }),
      },
    ]),
  ],
})
export class HrModule {}
