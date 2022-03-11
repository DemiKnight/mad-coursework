import {
  AppErrors,
  GetPostErrors,
  GetPostListErrors,
  LikePostErrors,
  NewPost,
  NewPostErrors,
  PaginationOption,
  Post,
  PostRaw,
  RemovePostErrors,
  Success,
  UnlikePostErrors,
  UpdatePostErrors,
} from '../services/utils/SpacebookRequests';
import {
  errorResp,
  Handler,
  initalListPostsPagination,
  ok,
  req,
  Verbs,
} from './SpacebookClient';
import {UserToPubUser} from '../services/utils/UserUtils';

export async function getAllPosts(
  userId: number,
): Promise<Handler<GetPostListErrors, Array<Post>>> {
  let postStore: Array<Post> = [];
  let lastReturnSize: number = 0;
  let error: GetPostListErrors | undefined;

  do {
    lastReturnSize = 0;
    const response = await getListOfPosts(userId, {
      ...initalListPostsPagination,
      offset: postStore.length,
    });
    if (response.intendedResult !== undefined) {
      // TODO improve
      lastReturnSize = response.intendedResult.length;
      response.intendedResult.forEach(x => postStore.push(x));
    } else {
      error = response.errors;
    }
  } while (lastReturnSize >= 50 && error === undefined);
  if (error === undefined) {
    return ok(postStore);
  } else {
    return errorResp(error);
  }
}

export async function getListOfPosts(
  userId: number,
  paginationOptions: PaginationOption = initalListPostsPagination,
): Promise<Handler<GetPostListErrors, Array<Post>>> {
  console.info(
    `Getting listOfPosts for ${userId}. Pagination ${paginationOptions.pageSize} & ${paginationOptions.offset}`,
  );
  const request = await req<undefined>(
    `user/${userId}/post`,
    Verbs.GET,
    undefined,
    [
      {key: 'limit', value: String(paginationOptions.pageSize)},
      {key: 'offset', value: String(paginationOptions.offset)},
    ],
  );

  return fetch(request).then(async response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        const body: Array<PostRaw> = await response.json();
        console.debug(`Success ${JSON.stringify(body)}`);
        const convertedBody: Array<Post> = body.map(rawP => {
          return {
            ...rawP,
            author: UserToPubUser(rawP.author),
          } as Post;
        });
        return ok(convertedBody);
      case 401:
        console.error(
          `Unauthorised whilst getting list of post: ${responseStr}`,
        );
        return errorResp(AppErrors.Unauthorised);
      case 403:
        console.error(`Post visibility issue ${responseStr}`);
        return errorResp(AppErrors.PostVisibility);
      case 404:
        console.error(
          `User not found whilst getting list of posts: ${responseStr}`,
        );
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(
          `Server error whilst getting list of posts: ${responseStr}`,
        );
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst getting list of posts: ${responseStr}`,
        );
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}

export async function addNewPost(
  userId: number,
  newPostText: string,
): Promise<Handler<NewPostErrors, Success>> {
  console.info(`Posting new post for user ${userId}, with text ${newPostText}`);
  const request = await req<NewPost>(`user/${userId}/post`, Verbs.POST, {
    text: newPostText,
  });

  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 201:
        return ok(true);
      case 401:
        console.error(`Unauthorised whilst creating new post: ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 404:
        console.error(
          `User not found whilst creating new post: ${responseStr}`,
        );
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(`Server error whilst creating new post: ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst creating new post: ${responseStr}`,
        );
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}

export async function getPost(
  userId: number,
  postId: number,
): Promise<Handler<GetPostErrors, Post>> {
  console.info(`Getting post ${postId} for user ${userId}`);
  const request = await req(`user/${userId}/post/${postId}`, Verbs.GET);
  return fetch(request).then(async response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        const body: Post = await response.json();
        console.debug(`Success ${body}`);
        return ok(body);
      case 401:
        console.error(`Unauthorised whilst getting post: ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 403:
        console.error(`Post visibility issue ${responseStr}`);
        return errorResp(AppErrors.PostVisibility);
      case 404:
        console.error(`Post or user not found ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(`Server error whilst getting post: ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst getting post: ${responseStr}`,
        );
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}

export async function removePost(
  userId: number,
  postId: number,
): Promise<Handler<RemovePostErrors, Success>> {
  console.info(`Removing post ${postId} for user ${userId}`);
  const request = await req(`user/${userId}/post/${postId}`, Verbs.DELETE);

  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        return ok(true);
      case 401:
        console.error(`Unauthorised whilst removing post: ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 403:
        console.error(
          `Post not associated with user, unable to remove: ${responseStr}`,
        );
        return errorResp(AppErrors.PostDeleteAccess);
      case 404:
        console.error(`Post or user not found: ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(`Server error whilst removing post: ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst removing post: ${responseStr}`,
        );
        return errorResp(AppErrors.UnknownHttpError);
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
        return errorResp(AppErrors.BadRequest);
      case 401:
        console.error(`Unauthorised whilst updating post ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 403:
        console.error(`Post not associated with user, ${responseStr}`);
        return errorResp(AppErrors.PostModifyAccess);
      case 404:
        console.error(`Post or user not found ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(`Server error whilst updating post: ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst updating post: ${responseStr}`,
        );
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}

export async function likePost(
  userId: number,
  postId: number,
): Promise<Handler<LikePostErrors, Success>> {
  console.info(`Liking post ${postId}, for use ${userId}`);
  const request = await req(`user/${userId}/post/${postId}/like`, Verbs.POST);
  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        return ok(true);
      case 401:
        console.error(`Unauthorised whilst liking post: ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 403:
        console.error(`Post already liked: ${responseStr}`);
        return errorResp(AppErrors.PostAlreadyLiked);
      case 404:
        console.error(`Post or user not found ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(`Server error whilst liking post: ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst liking post: ${responseStr}`,
        );
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}

export async function unlikePost(
  userId: number,
  postId: number,
): Promise<Handler<UnlikePostErrors, Success>> {
  console.info(`Unliking post ${postId} for user ${userId}`);
  const request = await req(`user/${userId}/post/${postId}/like`, Verbs.DELETE);
  return fetch(request).then(response => {
    const responseStr = JSON.stringify(response);
    switch (response.status) {
      case 200:
        return ok(true);
      case 401:
        console.error(`Unauthorised whilst unliking post: ${responseStr}`);
        return errorResp(AppErrors.Unauthorised);
      case 403:
        console.error(`Post already unliked: ${responseStr}`);
        return errorResp(AppErrors.PostAlreadyUnliked);
      case 404:
        console.error(`Post or user not found ${responseStr}`);
        return errorResp(AppErrors.NotFound);
      case 500:
        console.error(`Server error whilst unliking post: ${responseStr}`);
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst unliking post: ${responseStr}`,
        );
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}
