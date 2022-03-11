import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {SettingsMenuScreen} from './SettingsMenuScreen';
import {UpdateProfileScreen} from './UpdateProfileScreen';

export type SettingsStackNavParams = {
  Menu: undefined;
  UpdateProfile: undefined;
};

const SettingsStack = createNativeStackNavigator<SettingsStackNavParams>();

export const SettingsNav = () => {
  return (
    <SettingsStack.Navigator initialRouteName="Menu">
      <SettingsStack.Screen name={'Menu'} component={SettingsMenuScreen} />
      <SettingsStack.Screen
        name={'UpdateProfile'}
        component={UpdateProfileScreen}
      />
    </SettingsStack.Navigator>
  );
};
