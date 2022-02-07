import {
  CommonAppErrors,
  CommonHTTPErrors,
  LoginError,
  LoginRequest,
  LoginResponse,
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

export class SpacebookClient {
  private static baseURL: string = 'http://localhost:3333/api/1.0.0/';

  private static queryBuilder(
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

  private static async authHeaders(): Promise<
    Headers | CommonAppErrors.TokenNotFound
  > {
    // Get any token stores in x
    const key: Promise<CommonAppErrors.TokenNotFound | Headers> =
      Keychain.getGenericPassword().then(store => {
        return store === false
          ? CommonAppErrors.TokenNotFound
          : new Headers({'X-Authorization': store.password});
      });

    return await key;
  }

  private static async req<RequestT extends object | undefined = undefined>(
    url: string,
    verb: keyof typeof Verbs,
    requestBody: RequestT,
    parameterQueries?: Array<{key: string; value: string}>,
    requriesAuth: boolean = true,
  ): Promise<Request> {
    const pathQueries: string = SpacebookClient.queryBuilder(parameterQueries);

    const fullURL: string = `${this.baseURL}${url}${pathQueries}`;

    const authHeaders: Headers | CommonAppErrors.TokenNotFound | undefined =
      requriesAuth ? await SpacebookClient.authHeaders() : undefined;

    const finalRequestDetails = {
      method: verb,
      headers: authHeaders,
      body: requestBody,
    } as RequestInit;

    console.log(fullURL);
    console.log(requriesAuth);
    return new Request(fullURL, finalRequestDetails);
  }

  static async login(
    username: string,
    password: string,
  ): Promise<LoginResponse | LoginError> {
    const testRequest: Request = await SpacebookClient.req<LoginRequest>(
      'login',
      Verbs.POST,
      {
        username: username,
        password: password,
      },
      undefined,
      false,
    );
    console.log(testRequest);
    return fetch(testRequest)
      .then(async (response: Response) => {
        const body = await response.json();
        switch (response.status) {
          case 200:
            console.log('Successful login');
            if (body instanceof LoginResponse) {
              return body;
            } else {
              console.error(
                `Issue when parsing successful login body! ${body}`,
              );
              return 'Invalid';
            }
          case 400:
            console.log(
              `Error whilst logging in: Invalid username/password! ${body}`,
            );
            return 'Invalid';
          case 500:
            console.error(`Server error whilst logging in ${body}!`);
            return CommonHTTPErrors.Server_Error;
          default:
            console.error(`Unknown error whilst logging in! ${body}`);
            return CommonAppErrors.UnknownHttpError;
        }
      })
      .catch(error => {
        console.error(`Unknown error whilst logging in! ${error}`);
        return CommonAppErrors.UnknownHttpError;
      });
  }

  static async register(
    email: string,
    firstName: string,
    last_name: string,
    password: string,
  ): Promise<RegisterResponse | RegisterErrors> {
    const testRequest = await SpacebookClient.req<RegisterRequest>(
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
            const body = await response.json();
            if (body instanceof RegisterResponse) {
              return body;
            } else {
              console.error(
                `Issue when parsing successful login body! ${responseString}`,
              );
              return CommonAppErrors.UnknownHttpError;
            }
          case 400:
            console.error(`Bad request whilst registering. ${responseString}`);
            return CommonHTTPErrors.BadRequest;
          case 500:
            console.error(`Server error whilst logging in ${responseString}!`);
            return CommonHTTPErrors.Server_Error;
          default:
            console.error(`Unknown error whilst logging in! ${responseString}`);
            return CommonAppErrors.UnknownHttpError;
        }
      })
      .catch(error => {
        console.error(`Unknown error whilst logging in! ${error}`);
        return CommonAppErrors.UnknownHttpError;
      });
  }

  static logout(): Success | CommonHTTPErrors {
    return true;
  }
}
