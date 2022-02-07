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
  username: string;
  password: string;
};
export class LoginResponse {
  session_token!: string;
  user_id!: number;
}

export type LoginError =
  | 'Invalid'
  | CommonHTTPErrors.Server_Error
  | CommonAppErrors.UnknownHttpError;

// Logout

// Register
export type RegisterRequest = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class RegisterResponse {
  user_id!: number;
}
export type RegisterErrors =
  | CommonHTTPErrors.BadRequest
  | CommonHTTPErrors.Server_Error
  | CommonAppErrors.UnknownHttpError;
