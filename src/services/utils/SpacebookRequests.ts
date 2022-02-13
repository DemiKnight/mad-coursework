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
  FriendListVisibility,
  FriendAlreadyAdded,
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

// Get friend requests

export type GetFriendRequestsError =
  | CommonHTTPErrors.Server_Error
  | CommonHTTPErrors.Unauthorised
  | CommonHTTPErrors.BadRequest;

export type AcceptFriendRequestError =
  | CommonHTTPErrors.Server_Error
  | CommonHTTPErrors.NotFound
  | CommonHTTPErrors.Unauthorised;

// Friends list
export type PublicUser = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type FriendsListErrors =
  | CommonHTTPErrors.Server_Error
  | CommonHTTPErrors.NotFound
  | CommonAppErrors.FriendListVisibility
  | CommonHTTPErrors.Unauthorised;

export type AddFriendErrors =
  | CommonHTTPErrors.Server_Error
  | CommonHTTPErrors.NotFound
  | CommonAppErrors.FriendAlreadyAdded
  | CommonHTTPErrors.Unauthorised;

// User management
export type GetUserInfoErrors =
  | CommonHTTPErrors.Server_Error
  | CommonHTTPErrors.NotFound
  | CommonAppErrors.UnknownHttpError
  | CommonHTTPErrors.Unauthorised;

export type UserUpdateRequest = {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
};
