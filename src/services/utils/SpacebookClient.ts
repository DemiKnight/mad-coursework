import {
  CommonErrors,
  LoginError,
  LoginRequest,
  LoginResponse,
  RegisterErrors,
  RegisterResponse,
  Success,
} from './SpacebookRequests';

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
    if (input === undefined || input.length === 0) {
      return '';
    } else {
      const endTargetIndex = input.length - 1;
      return input.reduce((acc, value, index) => {
        // if (acc === '') {
        //   acc += '?';
        // }
        acc += `${value.key}=${value.value}`;
        if (index !== endTargetIndex) {
          acc += '&';
        }
        return acc;
      }, '?');
    }
  }

  private static authHeaders(): Headers {
    return new Headers({x: 'yy'});
  }

  private static req<RequestT extends object | undefined = undefined>(
    url: string,
    verb: keyof typeof Verbs,
    requestBody: RequestT,
    parameterQueries?: Array<{key: string; value: string}>,
    requriesAuth: boolean = true,
  ): Request {
    const pathQueries: string = SpacebookClient.queryBuilder(parameterQueries);

    const fullURL: string = `${this.baseURL}${url}${pathQueries}`;

    const authHeaders: Headers | undefined = requriesAuth
      ? SpacebookClient.authHeaders()
      : undefined;

    const finalRequestDetails = {
      method: verb,
      headers: authHeaders,
      body: requestBody,
    } as RequestInit;

    console.log(fullURL);
    console.log(requriesAuth);
    return new Request(fullURL, finalRequestDetails);
  }

  static login(username: string, password: string): LoginResponse | LoginError {
    const testRequest: Request = SpacebookClient.req<LoginRequest>(
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

  static register(
    email: string,
    firstName: string,
    last_name: string,
    password: string,
  ): RegisterResponse | RegisterErrors {}

  static logout(): Success | CommonErrors {
    return true;
  }
}
