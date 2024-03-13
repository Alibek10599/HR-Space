import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from 'src/app/grpc/auth.pb';
@Global()
@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('grpc.auth_url'),
            package: AUTH_PACKAGE_NAME,
            protoPath: 'proto/auth.proto',
          },
        }),
      },
    ]),
  ],
})
export class AuthModule {}
