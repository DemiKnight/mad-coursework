import {createServer} from 'miragejs';
// import {AnyFactories, AnyModels, AnyRegistry} from 'miragejs/-types';
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

describe('getUserInfo', () => {
  it.todo('Get user info');
});
describe('updateUserInfo', () => {
  it.todo('Update user info');
});
describe('getUserProfilePicture', () => {
  it.todo('Get profile picture');
});
describe('changeUserProfilePicture', () => {
  it.todo('Update profile picture');
});
