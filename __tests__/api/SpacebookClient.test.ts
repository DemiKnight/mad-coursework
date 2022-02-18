import {createServer} from 'miragejs';
import {req, Verbs} from '../../src/api/SpacebookClient';
import {Server} from 'miragejs/server';
import Keychain from 'react-native-keychain';

let server: Server;

// jest.mock(
//   'Keychain' /*, () => {
//   // const Keychain = require('react-native-keychain');
//   Keychain.getGenericPassword.mockReturnValue(
//     Promise.resolve({password: 'xx'}),
//   );
//   return Keychain;
// }*/,
// );

beforeEach(() => {
  server = createServer({
    environment: 'test',
  });
});
afterEach(() => {
  server.shutdown();
});

function general<T = boolean>(
  response: Request,
  bodyUsed: T,
  method: string = 'GET',
  url: string = 'http://localhost:3333/api/1.0.0/demo',
  headers: object = {
    map: {'content-type': 'application/json'},
  },
) {
  expect(response.url).toEqual(url);
  expect(response.method).toEqual(method);
  expect(response.bodyUsed).toEqual(bodyUsed);
  expect(response.headers).toEqual(headers);
}

describe('SpacebookClient: req', () => {
  it('GET request', async () => {
    // give / when
    const response: Request = await req(
      'demo',
      Verbs.GET,
      undefined,
      undefined,
      false,
    );

    // then
    general(response, false);
  });
  it('POST request', async () => {
    // give / when
    const response: Request = await req(
      'demo',
      Verbs.POST,
      undefined,
      undefined,
      false,
    );

    // then
    general(response, false, 'POST');
  });
  it.todo(
    'Post request full' /*, async () => {
    // given
    // Keychain.getGenericPassword.mockReturnValue(
    //   Promise.resolve({password: 'xx'}),
    // );
    // when
    // const response = await req(
    //   'demo',
    //   Verbs.POST,
    //   {test: 2},
    //   [{key: 'q', value: 'name'}],
    //   true,
    //   'application/xml',
    //   'http://api.spacebook.com/api/demo',
    // );
    // then
  }*/,
  );
});

describe('SpacebookClient: ok', () => {});
describe('SpacebookClient: errorResp', () => {});
