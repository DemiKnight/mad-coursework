import {FriendRequestUser, PublicUser} from './SpacebookRequests';

export function initialsFromUser(target: PublicUser): string {
  const firstName = target?.user_givenname?.charAt(0);
  const lastName = target?.user_familyname?.charAt(0);
  return (firstName || '') + (lastName || '');
}

export function backgroundColourRandom(name: string): string {
  return '#222222';
}
export function UserToPubUser(oldUser: FriendRequestUser): PublicUser {
  return {
    user_givenname: oldUser.first_name,
    user_familyname: oldUser.last_name,
    user_email: oldUser.email,
    user_id: 2,
  };
}
