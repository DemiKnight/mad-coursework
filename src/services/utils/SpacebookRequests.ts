// General Errors

export enum CommonHTTPErrors {
  Server_Error,
  Unauthorised,
  NotFound,
  BadRequest,
}

export enum CommonAppErrors {
  TokenNotFound,

  UnknownHttpError,
}

export const _Success = true;
export type Success = typeof _Success;

// Login
export type LoginRequest = {
  email: string;
  password: string;
};
export class LoginResponse {
  token!: string;
  id!: number;
}

export type LoginError =
  | 'Invalid'
  | CommonHTTPErrors.Server_Error
  | CommonAppErrors.UnknownHttpError;

// Logout

export type LogoutError =
  | CommonHTTPErrors.Unauthorised
  | CommonAppErrors.UnknownHttpError
  | CommonHTTPErrors.Server_Error;

// Register
export type RegisterRequest = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class RegisterResponse {
  id!: number;
}
export type RegisterErrors =
  | CommonHTTPErrors.BadRequest
  | CommonHTTPErrors.Server_Error
  | CommonAppErrors.UnknownHttpError;
