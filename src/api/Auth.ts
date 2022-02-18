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
} from '../services/utils/SpacebookRequests';
import {errorResp, Handler, ok, req, Verbs} from './SpacebookClient';

export async function logout(): Promise<Handler<LogoutError, Success>> {
  const request = await req('logout', Verbs.POST);

  return fetch(request)
    .then(async (response: Response) => {
      const responseString = JSON.stringify(response);
      switch (response.status) {
        case 200:
          console.log('Successfully loggedout...');
          return ok<LogoutError, Success>(true);
        case 400:
          console.error();
          return errorResp<LogoutError, Success>(CommonHTTPErrors.Unauthorised);
        default:
          console.error(`Unknown error whilst logging in! ${responseString}`);
          return errorResp<LogoutError, Success>(
            CommonAppErrors.UnknownHttpError,
          );
      }
    })
    .catch(error => {
      console.log(`Unexpect error occurred whilst logging out ${error}`);
      return errorResp<LogoutError, Success>(CommonHTTPErrors.Server_Error);
    });
}

export async function register(
  email: string,
  firstName: string,
  last_name: string,
  password: string,
): Promise<Handler<RegisterErrors, RegisterResponse>> {
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
          return ok<RegisterErrors, RegisterResponse>(body);
        case 400:
          console.error(`Bad request whilst registering. ${responseString}`);
          return errorResp<RegisterErrors, RegisterResponse>(
            CommonHTTPErrors.BadRequest,
          );
        case 500:
          console.error(`Server error whilst logging in ${responseString}!`);
          return errorResp<RegisterErrors, RegisterResponse>(
            CommonHTTPErrors.Server_Error,
          );
        default:
          console.error(`Unknown error whilst logging in! ${responseString}`);
          return errorResp<RegisterErrors, RegisterResponse>(
            CommonAppErrors.UnknownHttpError,
          );
      }
    })
    .catch(error => {
      console.error(`Unknown error whilst logging in! ${error}`);
      return errorResp<RegisterErrors, RegisterResponse>(
        CommonAppErrors.UnknownHttpError,
      );
    });
}

export async function login(
  username: string,
  password: string,
): Promise<Handler<LoginError, LoginResponse>> {
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
          return ok<LoginError, LoginResponse>(body);
        case 400:
          console.log(
            `Error whilst logging in: Invalid username/password! ${responseStr}`,
          );
          return errorResp<LoginError, LoginResponse>('Invalid');
        case 500:
          console.error(`Server error whilst logging in ${responseStr}!`);
          return errorResp<LoginError, LoginResponse>(
            CommonHTTPErrors.Server_Error,
          );
        default:
          console.error(`Unknown error whilst logging in! ${responseStr}`);
          return errorResp<LoginError, LoginResponse>(
            CommonAppErrors.UnknownHttpError,
          );
      }
    })
    .catch(error => {
      console.error(`Unknown error whilst logging in! ${error}`);
      return errorResp<LoginError, LoginResponse>(
        CommonAppErrors.UnknownHttpError,
      );
    });
}
