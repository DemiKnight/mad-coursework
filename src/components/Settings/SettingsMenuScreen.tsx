import React from 'react';
import {View} from 'react-native';
import {AuthContext} from '../../../App';
import {Button} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SettingsStackNavParams} from './SettingsNav';

type SettingsMenuProps = NativeStackScreenProps<SettingsStackNavParams, 'Menu'>;
export const SettingsMenuScreen = ({navigation}: SettingsMenuProps) => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View>
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
