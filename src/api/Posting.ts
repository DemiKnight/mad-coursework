import {
  CommonAppErrors,
  CommonHTTPErrors,
  GetPostErrors,
  LikePostErrors,
  NewPost,
  NewPostErrors,
  PaginationOption,
  Post,
  RemovePostErrors,
  Success,
  UnlikePostErrors,
  UpdatePostErrors,
} from '../services/utils/SpacebookRequests';
import {errorResp, Handler, ok, req, Verbs} from './SpacebookClient';

export async function getListOfPosts(userId: number) {
  console.info(`Getting listOfPosts for ${userId}`);
}
export async function addNewPost(
  userId: number,
  newPostText: string,
): Promise<Handler<NewPostErrors, Success>> {
  console.info(`Posting new post for user ${userId}, with text ${newPostText}`);
  const request = await req<NewPost>(`/user/${userId}/post`, Verbs.POST, {
    text: newPostText,
  });

  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 201:
        return ok(true);
      case 401:
        console.error(`Unauthorised whilst creating new post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Unauthorised);
      case 404:
        console.error(
          `User not found whilst creating new post: ${responseStr}`,
        );
        return errorResp(CommonHTTPErrors.NotFound);
      case 500:
        console.error(`Server error whilst creating new post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst creating new post: ${responseStr}`,
        );
        return errorResp(CommonAppErrors.UnknownHttpError);
    }
  });
}

export async function getPost(
  userId: number,
  postId: number,
): Promise<Handler<GetPostErrors, Post>> {
  console.info(`Getting post ${postId} for user ${userId}`);
  const request = await req<undefined>(
    `user/${userId}/post/${postId}`,
    Verbs.GET,
    undefined,
  );
  return fetch(request).then(async response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        const body: Post = await response.json();
        return ok(body);
      case 401:
        console.error(`Unauthorised whilst getting post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Unauthorised);
      case 403:
        console.error(`Post visability issue ${responseStr}`);
        return errorResp(CommonAppErrors.PostVisibility);
      case 404:
        console.error(`Post or user not found ${responseStr}`);
        return errorResp(CommonHTTPErrors.NotFound);
      case 500:
        console.error(`Server error whilst getting post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst getting post: ${responseStr}`,
        );
        return errorResp(CommonAppErrors.UnknownHttpError);
    }
  });
}

export async function removePost(
  userId: number,
  postId: number,
): Promise<Handler<RemovePostErrors, Success>> {
  console.info(`Removing post ${postId} for user ${userId}`);
  const request = await req<undefined>(
    `user/${userId}/post/${postId}`,
    Verbs.DELETE,
    undefined,
  );

  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        return ok(true);
      case 401:
        console.error(`Unauthorised whilst removing post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Unauthorised);
      case 403:
        console.error(
          `Post not associated with user, unable to remove: ${responseStr}`,
        );
        return errorResp(CommonAppErrors.PostDeleteAccess);
      case 404:
        console.error(`Post or user not found: ${responseStr}`);
        return errorResp(CommonHTTPErrors.NotFound);
      case 500:
        console.error(`Server error whilst removing post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst removing post: ${responseStr}`,
        );
        return errorResp(CommonAppErrors.UnknownHttpError);
    }
  });
}

export async function updatePost(
  userId: number,
  postId: number,
  postContent: string,
): Promise<Handler<UpdatePostErrors, Success>> {
  console.info(
    `Updating post ${postId} for user ${userId}, with text ${JSON.stringify(
      postContent,
    )}`,
  );
  const request = await req<NewPost>(
    `user/${userId}/post/${postId}`,
    Verbs.PATCH,
    {
      text: postContent,
    },
  );

  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        return ok(true);
      case 400:
        console.error(`Bad request whilst updating post ${responseStr}`);
        return errorResp(CommonHTTPErrors.BadRequest);
      case 401:
        console.error(`Unauthorised whilst updating post ${responseStr}`);
        return errorResp(CommonHTTPErrors.Unauthorised);
      case 403:
        console.error(`Post not associated with user, ${responseStr}`);
        return errorResp(CommonAppErrors.PostModifyAccess);
      case 404:
        console.error(`Post or user not found ${responseStr}`);
        return errorResp(CommonHTTPErrors.NotFound);
      case 500:
        console.error(`Server error whilst updating post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst updating post: ${responseStr}`,
        );
        return errorResp(CommonAppErrors.UnknownHttpError);
    }
  });
}

export async function likePost(
  userId: number,
  postId: number,
): Promise<Handler<LikePostErrors, Success>> {
  console.info(`Liking post ${postId}, for use ${userId}`);
  const request = await req<undefined>(
    `user/${userId}/post/${postId}/like`,
    Verbs.POST,
    undefined,
  );
  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        return ok(true);
      case 401:
        console.error(`Unauthorised whilst liking post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Unauthorised);
      case 403:
        console.error(`Post already liked: ${responseStr}`);
        return errorResp(CommonAppErrors.PostAlreadyLiked);
      case 404:
        console.error(`Post or user not found ${responseStr}`);
        return errorResp(CommonHTTPErrors.NotFound);
      case 500:
        console.error(`Server error whilst liking post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst liking post: ${responseStr}`,
        );
        return errorResp(CommonAppErrors.UnknownHttpError);
    }
  });
}

export async function unlikePost(
  userId: number,
  postId: number,
): Promise<Handler<UnlikePostErrors, Success>> {
  console.info(`Unliking post ${postId} for user ${userId}`);
  const request = await req<undefined>(
    `user/${userId}/post/${postId}/like`,
    Verbs.DELETE,
    undefined,
  );
  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        return ok(true);
      case 401:
        console.error(`Unauthorised whilst unliking post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Unauthorised);
      case 403:
        console.error(`Post already unliked: ${responseStr}`);
        return errorResp(CommonAppErrors.PostAlreadyUnliked);
      case 404:
        console.error(`Post or user not found ${responseStr}`);
        return errorResp(CommonHTTPErrors.NotFound);
      case 500:
        console.error(`Server error whilst unliking post: ${responseStr}`);
        return errorResp(CommonHTTPErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst unliking post: ${responseStr}`,
        );
        return errorResp(CommonAppErrors.UnknownHttpError);
    }
  });
}
