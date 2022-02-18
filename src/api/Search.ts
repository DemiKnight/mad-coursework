import {
  errorResp,
  initalListPostsPagination,
  ok,
  req,
  Verbs,
} from './SpacebookClient';
import {
  CommonAppErrors,
  CommonHTTPErrors,
  PaginationOption,
  Post,
  PublicUser,
} from '../services/utils/SpacebookRequests';

export async function search(
  query: string,
  scope: 'friends' | 'all',
  paginationOptions: PaginationOption = initalListPostsPagination,
) {
  console.info(`Searching with params: 
  Q: '${query}' 
  Scope: '${scope}' 
  Page: ${JSON.stringify(paginationOptions)}`);

  const request = await req('search', Verbs.GET, undefined, [
    {key: 'q', value: query},
    {key: 'search_in', value: scope},
    {key: 'limit', value: String(paginationOptions.pageSize)},
    {key: 'offset', value: String(paginationOptions.offset)},
  ]);

  fetch(request).then(async response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 200:
        const result: Array<PublicUser> = await response.json();
        return ok(result);
      case 400:
        console.error(
          `Bad request whilst searching for friends" ${responseStr} `,
        );
        return errorResp(CommonHTTPErrors.BadRequest);
      case 401:
        console.error(
          `Unauthorised whilst searching for friends" ${responseStr} `,
        );
        return errorResp(CommonHTTPErrors.Unauthorised);
      case 500:
        console.error(
          `Server error whilst getting list of posts: ${responseStr}`,
        );
        return errorResp(CommonHTTPErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst getting list of posts: ${responseStr}`,
        );
        return errorResp(CommonAppErrors.UnknownHttpError);
    }
  });
}
