/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface SetPasswordRequest {
  userId: number;
}

export interface ResetResponse {
  message: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  setPassword(request: SetPasswordRequest): Observable<ResetResponse>;
}

export interface AuthServiceController {
  setPassword(
    request: SetPasswordRequest,
  ): Promise<ResetResponse> | Observable<ResetResponse> | ResetResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['setPassword'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
