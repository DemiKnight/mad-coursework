import {
  CommonAppErrors,
  CommonHTTPErrors,
  LoginError,
  LoginRequest,
  LoginResponse,
  LogoutError,
  RegisterErrors,
  RegisterRequest,
  RegisterResponse,
  Success,
} from './SpacebookRequests';
import Keychain from 'react-native-keychain';

export enum Verbs {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Handler<T, Err> = {
  intendedResult?: T;
  errors?: Err;
};

function errorResp<T, Err>(error: Err): Handler<T, Err> {
  return {errors: error};
}
function ok<T, Err>(result: T): Handler<T, Err> {
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
  verb: keyof typeof Verbs,
  requestBody: RequestT,
  parameterQueries?: Array<{key: string; value: string}>,
  requriesAuth: boolean = true,
): Promise<Request> {
  const pathQueries: string = queryBuilder(parameterQueries);

  const fullURL: string = `${baseURL}${url}${pathQueries}`;

  const headersToInclude = new Headers({'Content-Type': 'application/json'});

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
    body: JSON.stringify(requestBody),
  } as RequestInit;

  console.log(fullURL);
  return new Request(fullURL, finalRequestDetails);
}

export class SpacebookClient {
  static async login(
    username: string,
    password: string,
  ): Promise<Handler<LoginResponse, LoginError>> {
    const testRequest: Request = await req<LoginRequest>(
      'login',
      Verbs.POST,
      {
        email: username,
        password: password,
      },
      undefined,
      false,
    );
    console.log(testRequest);
    return fetch(testRequest)
      .then(async (response: Response) => {
        const responseStr: string = JSON.stringify(response);
        switch (response.status) {
          case 200:
            const body: LoginResponse = await response.json();
            console.log('Successful login');
            return ok<LoginResponse, LoginError>(body);
          case 400:
            console.log(
              `Error whilst logging in: Invalid username/password! ${responseStr}`,
            );
            return errorResp<LoginResponse, LoginError>('Invalid');
          case 500:
            console.error(`Server error whilst logging in ${responseStr}!`);
            return errorResp<LoginResponse, LoginError>(
              CommonHTTPErrors.Server_Error,
            );
          default:
            console.error(`Unknown error whilst logging in! ${responseStr}`);
            return errorResp<LoginResponse, LoginError>(
              CommonAppErrors.UnknownHttpError,
            );
        }
      })
      .catch(error => {
        console.error(`Unknown error whilst logging in! ${error}`);
        return errorResp<LoginResponse, LoginError>(
          CommonAppErrors.UnknownHttpError,
        );
      });
  }

  static async register(
    email: string,
    firstName: string,
    last_name: string,
    password: string,
  ): Promise<Handler<RegisterResponse, RegisterErrors>> {
    const testRequest = await req<RegisterRequest>(
      'user',
      Verbs.POST,
      {
        email: email,
        first_name: firstName,
        last_name: last_name,
        password: password,
      },
      undefined,
      false,
    );
    return fetch(testRequest)
      .then(async (response: Response) => {
        const responseString = JSON.stringify(response);
        switch (response.status) {
          case 201: // created user successfully.
            const body: RegisterResponse = await response.json();
            console.log(body);
            return ok<RegisterResponse, RegisterErrors>(body);
          case 400:
            console.error(`Bad request whilst registering. ${responseString}`);
            return errorResp<RegisterResponse, RegisterErrors>(
              CommonHTTPErrors.BadRequest,
            );
          case 500:
            console.error(`Server error whilst logging in ${responseString}!`);
            return errorResp<RegisterResponse, RegisterErrors>(
              CommonHTTPErrors.Server_Error,
            );
          default:
            console.error(`Unknown error whilst logging in! ${responseString}`);
            return errorResp<RegisterResponse, RegisterErrors>(
              CommonAppErrors.UnknownHttpError,
            );
        }
      })
      .catch(error => {
        console.error(`Unknown error whilst logging in! ${error}`);
        return errorResp<RegisterResponse, RegisterErrors>(
          CommonAppErrors.UnknownHttpError,
        );
      });
  }

  static async logout(): Promise<Handler<Success, LogoutError>> {
    const request = await req('logout', Verbs.POST, {});

    return fetch(request)
      .then(async (response: Response) => {
        const responseString = JSON.stringify(response);
        switch (response.status) {
          case 200:
            console.log('Successfully loggedout...');
            return ok<Success, LogoutError>(true);
          case 400:
            console.error();
            return errorResp<Success, LogoutError>(
              CommonHTTPErrors.Unauthorised,
            );
          default:
            console.error(`Unknown error whilst logging in! ${responseString}`);
            return errorResp<Success, LogoutError>(
              CommonAppErrors.UnknownHttpError,
            );
        }
      })
      .catch(error => {
        console.log(`Unexpect error occurred whilst logging out ${error}`);
        return errorResp<Success, LogoutError>(CommonHTTPErrors.Server_Error);
      });
  }
}
