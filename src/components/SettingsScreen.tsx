import React from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../../App';
import {Button} from 'react-native-elements';

export const SettingsScreen = () => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View>
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
