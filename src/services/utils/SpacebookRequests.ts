// General Errors
export enum CommonErrors {
  Server_Error,
  Unauthorised,
  NotFound,
  BadRequest,
}

export const _Success = true;
export type Success = typeof _Success;

// Login
export type LoginRequest = {
  username: string;
  password: string;
};
export type LoginResponse = {
  session_token: string;
  user_id: number;
};

export type LoginError = 'Invalid' | CommonErrors.Server_Error;

// Logout

// Register
export type RegisterRequest = {};

export type RegisterResponse = {
  user_id: number;
};
export type RegisterErrors =
  | CommonErrors.BadRequest
  | CommonErrors.Server_Error;
