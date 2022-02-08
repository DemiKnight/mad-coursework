import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './Login/Login';
import {Register} from './Register/Register';

export type AuthStackParams = {
  Login: {
    initialUsername: string;
    initialPassword: string;
  };
  Register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const Auth = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={Login}
        initialParams={{initialUsername: '', initialPassword: ''}}
      />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};
