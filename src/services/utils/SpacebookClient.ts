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

  private static req<RequestT = undefined>(
    url: string,
    method: keyof typeof Verbs,
    body: RequestT,
    parameterQueries?: Array<{key: string; value: string}>,
    requriesAuth: boolean = true,
  ): Request {
    const pathQueries: string = SpacebookClient.queryBuilder(parameterQueries);

    const fullURL: string = `${this.baseURL}${url}${pathQueries}`;

    const headers: Headers = requriesAuth
      ? SpacebookClient.authHeaders()
      : new Headers();

    console.log(requriesAuth);
    return new Request('');
  }

  static login(username: string, password: string): LoginResponse | LoginError {
    const testRequest: Request = SpacebookClient.req<LoginRequest>(
      'login',
      Verbs.POST,
      {
        username: username,
        password: password,
      },
    );
    fetch(testRequest).then();

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
