import {FriendRequestUser, PublicUser} from './SpacebookRequests';

export function initialsFromUser(target: PublicUser): string {
  const firstName = target?.user_givenname?.charAt(0);
  const lastName = target?.user_familyname?.charAt(0);
  return (firstName || '') + (lastName || '');
}

export function UserToPubUser(oldUser: FriendRequestUser): PublicUser {
  return {
    user_givenname: oldUser.first_name,
    user_familyname: oldUser.last_name,
    user_email: oldUser.email,
    user_id: oldUser.user_id,
  };
}

export function readableDateTiem(str: string): string {
  const date = new Date(str);

  return date.toLocaleDateString();
}

export function trimPostText(content: string, size: number = 150): string {
  if (content.length >= size - 3) {
    return content.substring(0, size - 3) + '...';
  } else {
    return content;
  }
}
