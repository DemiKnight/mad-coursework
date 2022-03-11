import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsMenuScreen} from './SettingsMenuScreen';
import {UpdateProfileScreen} from './UpdateProfileScreen';
import {PublicUser} from '../../services/utils/SpacebookRequests';

export type SettingsStackNavParams = {
  Menu: undefined;
  UpdateProfile: {
    user: PublicUser;
  };
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
