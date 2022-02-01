import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './Login/Login';
import {Register} from './Register/Register';

type AuthStackParams = {
  login: undefined;
  register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const Auth = () => {
  return (
    <AuthStack.Navigator initialRouteName="login">
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="register" component={Register} />
    </AuthStack.Navigator>
  );
};
