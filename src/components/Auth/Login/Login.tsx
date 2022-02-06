import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {AuthContext} from '../../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../Auth';

type LoginProps = NativeStackScreenProps<AuthStackParams, 'Login'>;

export const Login = ({navigation}: LoginProps) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const {signIn} = React.useContext(AuthContext);

  const isSubmitDisabled = React.useMemo<boolean>(
    () => username !== '' && password !== '' && username?.includes('@'),
    [username, password],
  );

  return (
    <SafeAreaView>
      <Text>Login</Text>
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
      <Button
        disabled={!isSubmitDisabled}
        title="Sign in"
        onPress={() => signIn(username, password)}
      />
      <Button
        title="To Register"
        onPress={() => navigation.navigate('Register')}
      />
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
