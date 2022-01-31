import {APIService} from '../utils/APIService';

// type Request = {};
//
type AuthRequest = {
  username: string;
  password: string;
};

export interface AuthResponse {
  token: string;
}

export class AuthenticationService extends APIService {
  login(email: string, password: string): Promise<Response> {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(x => JSON.stringify(x))
      .then(y => AuthResponse());
  }
}

// export const authenticationService = new AuthenticationService()
