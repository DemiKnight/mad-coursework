import {PublicUser} from './SpacebookRequests';

export function initialsFromUser(target: PublicUser): string {
  const firstName = target?.first_name.charAt(0);
  const lastName = target?.last_name.charAt(0);
  return (firstName || '') + (lastName || '');
}

export function backgroundColourRandom(name: string): string {
  return '#222222';
}
