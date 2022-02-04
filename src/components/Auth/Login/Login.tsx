import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {AuthContext} from '../../../../App';

export const Login = () => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.homeText}>
      <Text>Login Screen Placeholder</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign in" onPress={() => signIn(username, password)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  homeText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
