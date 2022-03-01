import {
  errorResp,
  Handler,
  initalListPostsPagination,
  ok,
  req,
  Verbs,
} from './SpacebookClient';
import {
  AppErrors,
  PaginationOption,
  PublicUser,
  SearchErrors,
} from '../services/utils/SpacebookRequests';

export async function search(
  query: string,
  scope: 'friends' | 'all',
  paginationOptions: PaginationOption = initalListPostsPagination,
): Promise<Handler<SearchErrors, Array<PublicUser>>> {
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

  return fetch(request).then(async response => {
    const responseStr = JSON.stringify(response);

    switch (response.status) {
      case 200:
        const result: Array<PublicUser> = await response.json();
        return ok(result);
      case 400:
        console.error(
          `Bad request whilst searching for friends" ${responseStr} `,
        );
        return errorResp(AppErrors.BadRequest);
      case 401:
        console.error(
          `Unauthorised whilst searching for friends" ${responseStr} `,
        );
        return errorResp(AppErrors.Unauthorised);
      case 500:
        console.error(
          `Server error whilst searching for friends: ${responseStr}`,
        );
        return errorResp(AppErrors.Server_Error);
      default:
        console.error(
          `Unknown HTTP response whilst searching for friends: ${responseStr}`,
        );
        return errorResp(AppErrors.UnknownHttpError);
    }
  });
}
