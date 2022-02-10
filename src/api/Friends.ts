export function getFriendRequests() {
  console.info('Getting friend requests...');
}

export function acceptFriendRequest(userId: number) {
  console.info(`accept friend request for ${userId}`);
}

export function declineFriendRequest(userId: number) {
  console.info(`Decline Friend Request for ${userId}`);
}

export function getFriendList(userId: number) {
  console.info(`Get Friend list ${userId}`);
}

export function addFriend(userId: number) {
  console.info(`Add user as friend ${userId}`);
}
