import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {AuthContext} from '../../../../App';

export const Login = () => {
  // const [username, setUsername] = React.useState<string>('');
  // const [password, setPassword] = React.useState<string>('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.homeText}>
      <Text>Login Screen Placeholder</Text>
      <Button title="Sign in" onPress={() => signIn('yys', 'zz')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
