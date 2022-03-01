import {errorResp, Handler, ok, req, Verbs} from './SpacebookClient';
import {
  AppErrors,
  GetProfilePictureErrors,
  GetUserInfoErrors,
  PostProfilePictureErrors,
  ProfilePictureSuccess,
  PublicUser,
  Success,
  UserUpdateErrors,
  UserUpdateRequest,
} from '../services/utils/SpacebookRequests';

export async function getUserInfo(
  userId: number,
): Promise<Handler<GetUserInfoErrors, PublicUser>> {
  console.info(`Get user info for ${userId}`);
  const request = await req(`user/${userId}`, Verbs.GET);

  return fetch(request).then(async response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 200:
        const body: PublicUser = await response.json();
        console.info(`Successfully retrieved user info ${responseStr}`);
        return ok(body);
      case 404:
        console.error(`User not found: ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 401:
        console.error(`Unauthorised for finding users ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 500:
        console.error(`Unknown server error ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}

export async function updateUserInfo(
  userId: number,
  password?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
): Promise<Handler<UserUpdateErrors, Success>> {
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

  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 200:
        console.info(`Successfully updated with following body ${responseStr}`);
        return ok(true);
      case 404:
        console.error(`User id not found ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 403:
        console.error(`Forbidden when updating user ${responseStr}`);
        return errorResp(AppErrors.Forbidden);
      case 401:
        console.error(`Unauthorised request for user ${userId} ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 400:
        console.error(`Bad Request ${responseStr}`);
        return errorResp(AppErrors.BadRequest);
      case 500:
        console.error(`Unknown server error ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(`Unknown response from server ${responseStr}`);
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}

export async function getUserProfilePicture(
  userId: number,
): Promise<Handler<GetProfilePictureErrors, ProfilePictureSuccess>> {
  console.info(`Get user profile picture ${userId}`);

  const request = await req(`user/${userId}/photo`, Verbs.GET);

  return fetch(request).then(async response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 200:
        const photoBlob: Blob = await response.blob();
        console.info(
          `Successfully retrieved photo ${photoBlob.size} ${photoBlob.type}`,
        );
        const urlPhoto: string = URL.createObjectURL(photoBlob);
        return ok(urlPhoto);
      case 401:
        console.error(`Unauthorised request for user ${userId} ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 404:
        console.error(`User id not found ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(`Error server error ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(`Unknown response from server ${responseStr}`);
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}

export async function changeUserProfilePicture(
  userId: number,
  photo: Blob,
  photoType: 'png' | 'jpeg' = 'png',
): Promise<Handler<PostProfilePictureErrors, Success>> {
  console.info(`Setting user profile picture for ${userId}`);

  const request = await req(
    `user/${userId}/photo`,
    Verbs.POST,
    photo,
    undefined,
    undefined,
    `image/${photoType}`,
  );

  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        console.info('Successfully uploaded photo');
        return ok(true);
      case 400:
        console.error(`Bad request when uploading photo ${responseStr}`);
        return errorResp(AppErrors.BadRequest);
      case 401:
        console.error(`Unauthorised request for user ${userId} ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 404:
        console.error(`User id (${userId}) not found ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(`Error server error ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(`Unknown response from server ${responseStr}`);
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}
