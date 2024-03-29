/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.pb';

export const protobufPackage = 'auth';

export interface User {
  id: number;
  email: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | undefined | null;
}

export interface RegisterRequest {
  email: string;
  password: string;
  roleId: number;
}

export interface RegisterResponse {
  status: number;
  errorMessage?: string | null;
  user?: User | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export interface ProfileRequest {
  email: string;
}

export interface ProfileResponse {
  email: string;
  roleId: number;
}

export interface ResetRequest {
  email: string;
}

export interface ResetResponse {
  message: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  profile(request: Empty, ...rest: any): Observable<ProfileResponse>;

  reset(request: ResetRequest): Observable<ResetResponse>;
}

export interface AuthServiceController {
  register(
    request: RegisterRequest,
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  login(
    request: LoginRequest,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(
    request: ValidateRequest,
  ):
    | Promise<ValidateResponse>
    | Observable<ValidateResponse>
    | ValidateResponse;

  profile(
    request: Empty,
    ...rest: any
  ): Promise<ProfileResponse> | Observable<ProfileResponse> | ProfileResponse;

  reset(
    request: ResetRequest,
  ): Promise<ResetResponse> | Observable<ResetResponse> | ResetResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'register',
      'login',
      'validate',
      'profile',
      'reset',
    ];
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
