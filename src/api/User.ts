import {errorResp, Handler, ok, req, Verbs} from './SpacebookClient';
import {
  CommonAppErrors,
  CommonHTTPErrors,
  GetUserInfoErrors,
  LogoutError,
  PublicUser,
  RegisterRequest,
  Success,
  UserUpdateRequest,
} from '../services/utils/SpacebookRequests';

export async function getUserInfo(
  userId: number,
): Promise<Handler<GetUserInfoErrors, PublicUser>> {
  console.info(`Get user info for ${userId}`);
  const request = await req('user/${userId}', Verbs.GET, {});

  return fetch(request).then(async response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 200:
        const body: PublicUser = await response.json();
        console.info(`Successfully retrieved user info ${responseStr}`);
        return ok(body);
      case 404:
        console.error(`User not found: ${responseStr}`);
        return errorResp(CommonHTTPErrors.NotFound);
      case 401:
        console.error(`Unauthorised for finding users ${responseStr}`);
        return errorResp(CommonHTTPErrors.Unauthorised);
      case 500:
        console.error(`Unknown server error ${responseStr}`);
        return errorResp(CommonHTTPErrors.Server_Error);
      default:
        return errorResp(CommonAppErrors.UnknownHttpError);
    }
  });
}

export async function updateUserInfo(
  userId: number,
  password?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
) {
  console.info(`Update user information for ${userId}`);
  const requestBody: UserUpdateRequest = {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName,
  };

  const request = await req<UserUpdateRequest>(
    `user/${userId}`,
    Verbs.PATCH,
    requestBody,
  );

  fetch(request).then(response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 200:
        return ok(true);
      case 404:
        console.error();
        return errorResp();
      case 403:
      case 401:
      case 400:
      default:
    }
  });
}

export async function getUserProfilePicture(userId: number) {
  console.info(`Get user profile picture ${userId}`);
}
export async function changeUserProfilePicture(userId: number, photo: Blob) {
  console.info(`Setting user profile picture for ${userId}`);
}
