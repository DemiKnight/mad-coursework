import {AppErrors} from '../services/utils/SpacebookRequests';

export function mapErrors<Err extends AppErrors | undefined>(
  error: Err,
  actionName?: string,
  resourceName?: string,
): Array<string> {
  console.log(`${error} ${actionName} ${resourceName}`);

  const errorT: AppErrors =
    error === undefined ? AppErrors.UnknownError : error;

  switch (error) {
    case undefined:
      return [`Unknown error occurred whilst ${actionName} ${resourceName}`];
    case AppErrors.NotFound:
      return [`Unable to find ${resourceName}`];
    case AppErrors.Unauthorised:
      return [
        `Authentication error, please login in again. Unauthorised whilst ${actionName} ${resourceName}`,
      ];
    case AppErrors.FriendAlreadyAdded:
      return [
        `Unable to ${actionName} ${resourceName} due to user already being a friend.`,
      ];
    case AppErrors.FriendListVisibility:
      return [
        `Unable to ${actionName} ${resourceName} due to the user not being a friend.`,
      ];
    case AppErrors.Server_Error:
      return [
        `The server encountered an error whilst ${actionName} ${resourceName}`,
      ];
    default:
      return [`${AppErrors[errorT]} whilst ${actionName} ${resourceName}`];
  }
}
