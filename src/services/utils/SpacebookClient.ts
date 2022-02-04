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
    fetch(testRequest).then(x => console.log(`response: ${JSON.stringify(x)}`));

    return {session_token: 'xx', user_id: 22};
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
        firstName: firstName,
        lastName: last_name,
        password: password,
      },
      undefined,
      false,
    );
    fetch();
  }

  static logout(): Success | CommonHTTPErrors {
    return true;
  }
}
