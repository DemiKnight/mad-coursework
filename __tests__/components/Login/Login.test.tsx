import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Login} from '../../../src/components/Login/Login';

describe('Login component', () => {
  it('Renders properly', () => {
    renderer.create(<Login />);
  });
});