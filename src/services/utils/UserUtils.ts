import {PublicUser} from './SpacebookRequests';

export function initialsFromUser(target: PublicUser): string {
  const firstName = target.first_name.at(0);
  const lastName = target.last_name.at(0);
  return (firstName || '') + (lastName || '');
}
