// General Errors

export enum AppErrors {
  // HTTP Errors
  Server_Error,
  Unauthorised,
  Forbidden,
  NotFound,
  BadRequest,
  // App errors
  TokenNotFound,
  UnknownHttpError,
  FriendListVisibility,
  FriendAlreadyAdded,
  PostVisibility,
  PostDeleteAccess,
  PostModifyAccess,
  PostAlreadyLiked,
  PostAlreadyUnliked,
  UnknownError,
}

export type SuccessT<T> = T;
export type Success = SuccessT<true>;

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
  | AppErrors.Server_Error
  | AppErrors.UnknownHttpError;

// Logout

export type LogoutError =
  | AppErrors.Unauthorised
  | AppErrors.UnknownHttpError
  | AppErrors.Server_Error;

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
  | AppErrors.BadRequest
  | AppErrors.Server_Error
  | AppErrors.UnknownHttpError;

// Get friend requests
export type FriendRequestUser = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type GetFriendRequestsError =
  | AppErrors.Server_Error
  | AppErrors.Unauthorised
  | AppErrors.BadRequest;

export type SendFriendRequestError =
  | AppErrors.Server_Error
  | AppErrors.NotFound
  | AppErrors.Unauthorised;

// Friends list
export type PublicUser = {
  user_id: number;
  user_givenname: string;
  user_familyname: string;
  user_email: string;
};

export type FriendsListErrors =
  | AppErrors.Server_Error
  | AppErrors.NotFound
  | AppErrors.FriendListVisibility
  | AppErrors.Unauthorised;

export type AddFriendErrors =
  | AppErrors.Server_Error
  | AppErrors.NotFound
  | AppErrors.FriendAlreadyAdded
  | AppErrors.Unauthorised;

// User management
export type GetUserInfoErrors =
  | AppErrors.Server_Error
  | AppErrors.NotFound
  | AppErrors.UnknownHttpError
  | AppErrors.Unauthorised;

export type UserUpdateErrors =
  | AppErrors.Server_Error
  | AppErrors.NotFound
  | AppErrors.BadRequest
  | AppErrors.Forbidden
  | AppErrors.UnknownHttpError
  | AppErrors.Unauthorised;

export type UserUpdateRequest = {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
};

// User profile picture
export type ProfilePictureSuccess = SuccessT<string>; // URL to local photo
export type GetProfilePictureErrors =
  | AppErrors.Server_Error
  | AppErrors.NotFound
  | AppErrors.UnknownHttpError
  | AppErrors.Unauthorised;
export type PostProfilePictureErrors =
  | AppErrors.Server_Error
  | AppErrors.NotFound
  | AppErrors.BadRequest
  | AppErrors.UnknownHttpError
  | AppErrors.Unauthorised;

// Post management

export type PaginationOption = {
  pageSize: number;
  offset: number;
};

export type NewPost = {
  text: string;
};

export type Post = {
  post_id: number;
  timestamp: number;
  author: PublicUser;
  numLikes: number;
} & NewPost;

export type GetPostListErrors =
  | AppErrors.UnknownHttpError
  | AppErrors.PostVisibility
  | AppErrors.Server_Error
  | AppErrors.Unauthorised
  | AppErrors.NotFound;

export type NewPostErrors =
  | AppErrors.UnknownHttpError
  | AppErrors.Server_Error
  | AppErrors.Unauthorised
  | AppErrors.NotFound;

export type GetPostErrors =
  | AppErrors.UnknownHttpError
  | AppErrors.PostVisibility
  | AppErrors.Server_Error
  | AppErrors.Unauthorised
  | AppErrors.NotFound;

export type RemovePostErrors =
  | AppErrors.PostDeleteAccess
  | AppErrors.UnknownHttpError
  | AppErrors.Server_Error
  | AppErrors.Unauthorised
  | AppErrors.NotFound;

export type UpdatePostErrors =
  | AppErrors.PostModifyAccess
  | AppErrors.BadRequest
  | AppErrors.UnknownHttpError
  | AppErrors.Server_Error
  | AppErrors.Unauthorised
  | AppErrors.NotFound;
export type LikePostErrors =
  | AppErrors.PostAlreadyLiked
  | AppErrors.UnknownHttpError
  | AppErrors.Server_Error
  | AppErrors.Unauthorised
  | AppErrors.NotFound;
export type UnlikePostErrors =
  | AppErrors.PostAlreadyUnliked
  | AppErrors.UnknownHttpError
  | AppErrors.Server_Error
  | AppErrors.Unauthorised
  | AppErrors.NotFound;

// Search
export type SearchErrors =
  | AppErrors.BadRequest
  | AppErrors.Server_Error
  | AppErrors.UnknownHttpError
  | AppErrors.Unauthorised;
