import {errorResp, Handler, ok, req, Verbs} from './SpacebookClient';
import {
  SendFriendRequestError,
  AddFriendErrors,
  AppErrors,
  FriendRequestUser,
  FriendsListErrors,
  GetFriendRequestsError,
  PublicUser,
  Success,
} from '../services/utils/SpacebookRequests';
import {UserToPubUser} from '../services/utils/UserUtils';

export async function getFriendRequests(): Promise<
  Handler<GetFriendRequestsError, Array<PublicUser>>
> {
  console.info('Getting friend requests...');
  const result = await req('friendrequests', Verbs.GET);

  return fetch(result).then(async response => {
    const responseString = JSON.stringify(response);
    switch (response.status) {
      case 200:
        const body: Array<FriendRequestUser> = await response.json();
        console.log(`Successful response ${JSON.stringify(body)}`);
        return ok(body.map(UserToPubUser));
      case 401:
        console.error(
          `Unauthorised whilst getting friend requests: ${responseString}`,
        );
        return errorResp(AppErrors.Unauthorised);
      default:
        console.error(`Error from server ${responseString}`);
        return errorResp(AppErrors.Server_Error);
    }
  });
}

export async function acceptFriendRequest(
  userId: number,
): Promise<Handler<SendFriendRequestError, Success>> {
  console.info(`accept friend request for ${userId}`);
  const result = await req(`friendrequests/${userId}`, Verbs.POST);

  return fetch(result).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        // const body = await response.json();
        return ok(true);
      case 404:
        console.error(`Friend request to accept not found: ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 401:
        console.error(
          `Unauthorised whilst accepting friend request: ${responseStr}`,
        );
        return errorResp(AppErrors.Unauthorised);
      default:
        console.error(`Error from server ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
    }
  });
}

export async function declineFriendRequest(
  userId: number,
): Promise<Handler<SendFriendRequestError, Success>> {
  console.info(`Decline Friend Request for ${userId}`);
  const result = await req(`friendrequests/${userId}`, Verbs.DELETE);

  return fetch(result).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        console.log(`Successfully declined friend request: ${responseStr}`);
        return ok(true);
      case 404:
        console.error(`Friend request to accept not found: ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 401:
        console.error(
          `Unauthorised whilst accepting friend request: ${responseStr}`,
        );
        return errorResp(AppErrors.Unauthorised);
      default:
        console.error(`Error from server ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
    }
  });
}

export async function getFriendList(
  userId: number,
): Promise<Handler<FriendsListErrors, Array<PublicUser>>> {
  console.info(`Get Friend list ${userId}`);
  const result = await req(`user/${userId}/friends`, Verbs.GET);

  return fetch(result).then(async response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 200:
        console.log(`Successfully got friend list ${responseStr}`);
        const body: Array<PublicUser> = await response.json();
        return ok(body);
      case 404:
        console.error(`Requested list is wasn't found ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 403:
        console.warn(`Requested friend list isn't visible ${responseStr}`);
        return errorResp(AppErrors.FriendListVisibility);
      case 401:
        console.error(
          `Unauthorised whilst retrieving friend list ${responseStr}`,
        );
        return errorResp(AppErrors.Unauthorised);
      default:
        console.error(`Error from server ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
    }
  });
}

export async function addFriend(
  userId: number,
): Promise<Handler<AddFriendErrors, Success>> {
  console.info(`Add user as friend ${userId}`);
  const result = await req(`user/${userId}/friends`, Verbs.POST);

  return fetch(result).then(response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 201:
        console.info(`Successfully sent friend request: ${responseStr}`);
        return ok(true);
      case 404:
        console.error(`User wasn't found: ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 403:
        console.warn(`User already friends ${responseStr}`);
        return errorResp(AppErrors.FriendAlreadyAdded);
      case 401:
        console.error(`Unauthorised whilst adding friend: ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      default:
        console.error(`Error from server ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
    }
  });
}
