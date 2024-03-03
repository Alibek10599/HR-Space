import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from './auth.pb';
import { AuthService } from './auth.service';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
@Global()
@Module({
  controllers: [AuthController, RolesController],
  providers: [AuthService, RolesService],
  exports: [AuthService, RolesService],
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
