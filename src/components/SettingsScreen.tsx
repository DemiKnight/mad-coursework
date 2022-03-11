import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../App';
import {Button} from 'react-native-elements';

export const SettingsScreen = () => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
    </SafeAreaView>
  );
};
