import {createServer} from 'miragejs';
import {req, Verbs} from '../../src/api/SpacebookClient';
import {Server} from 'miragejs/server';

let server: Server;

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
  url: string = 'http://localhost:3333/api/1.0.0/demo',
  method: string = 'POST',
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
      Verbs.POST,
      {},
      undefined,
      false,
    );

    // then
    general(response, false);
  });
  it('POST request', async () => {});
});

describe('SpacebookClient: ok', () => {});
describe('SpacebookClient: errorResp', () => {});
