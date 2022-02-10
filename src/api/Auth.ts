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

export async function logout(): Promise<Handler<Success, LogoutError>> {
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
          return errorResp<Success, LogoutError>(CommonHTTPErrors.Unauthorised);
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

export async function register(
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

export async function login(
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
