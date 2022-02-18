import {CommonAppErrors} from '../services/utils/SpacebookRequests';
import Keychain from 'react-native-keychain';

export enum Verbs {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Handler<Err, T> = {
  intendedResult?: T;
  errors?: Err;
};

export function errorResp<Err, T>(error: Err): Handler<Err, T> {
  return {errors: error};
}
export function ok<Err, T>(result: T): Handler<Err, T> {
  return {intendedResult: result};
}

const baseURL: string = 'http://localhost:3333/api/1.0.0/';

function queryBuilder(
  input: Array<{key: string; value: string}> | undefined,
): string {
  if (input === undefined || input?.length === 0) {
    return '';
  } else {
    const endTargetIndex = input.length - 1;
    return input.reduce((acc, value, index) => {
      acc += `${value.key}=${value.value}`;
      if (index !== endTargetIndex) {
        acc += '&';
      }
      return acc;
    }, '?');
  }
}

function authKey(): Promise<string | CommonAppErrors.TokenNotFound> {
  return Keychain.getGenericPassword()
    .then(store => {
      if (store) {
        return store.password;
      } else {
        return CommonAppErrors.TokenNotFound;
      }
    })
    .catch(error => {
      console.error(error);
      return CommonAppErrors.TokenNotFound;
    });
}

export async function req<RequestT extends object | undefined = undefined>(
  url: string,
  verb: keyof typeof Verbs = Verbs.GET,
  requestBody?: RequestT,
  parameterQueries?: Array<{key: string; value: string}>,
  requriesAuth: boolean = true,
  contentType: string = 'application/json',
  hostURL: string = baseURL,
): Promise<Request> {
  const pathQueries: string = queryBuilder(parameterQueries);

  const fullURL: string = `${hostURL}${url}${pathQueries}`;

  const headersToInclude = new Headers({'Content-Type': contentType});

  if (requriesAuth) {
    const potentialKey: string | CommonAppErrors.TokenNotFound =
      await authKey();

    if (potentialKey === CommonAppErrors.TokenNotFound) {
      console.error(
        'Token not found for authenticating requests! Everything will crash & burn',
      );
      return Promise.reject(
        `API request ${url} requires auth but error whilst obtaining token`,
      );
    } else {
      headersToInclude.set('X-Authorization', potentialKey);
    }
  }

  const finalRequestDetails = {
    method: verb,
    headers: headersToInclude,
    body:
      contentType === 'application/json'
        ? JSON.stringify(requestBody)
        : requestBody,
  } as RequestInit;
  return new Request(fullURL, finalRequestDetails);
}
