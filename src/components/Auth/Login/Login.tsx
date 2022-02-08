import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {AuthContext} from '../../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../Auth';
import {Handler} from '../../../services/utils/SpacebookClient';
import {
  RegisterErrors,
  RegisterResponse,
} from '../../../services/utils/SpacebookRequests';

type LoginProps = {
  initialUsername?: string;
  initialPassword?: string;
};

type LoginNavProps = NativeStackScreenProps<AuthStackParams, 'Login'>;

export const Login = ({route, navigation}: LoginNavProps) => {
  const {initialUsername, initialPassword}: LoginProps = route.params;
  const [email, setEmail] = React.useState<string>(initialUsername);
  const [password, setPassword] = React.useState<string>(initialPassword);

  const {signIn} = React.useContext(AuthContext);

  const handleResponse = async (
    fn: Promise<Handler<RegisterResponse, RegisterErrors>>,
  ) => {
    const result = await fn;
    if (result.intendedResult !== undefined) {
    }
  };

  // todo improve or use third-party library
  const isSubmitDisabled = React.useMemo<boolean>(
    () => email !== '' && password !== '' && email?.includes('@'),
    [email, password],
  );

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        disabled={!isSubmitDisabled}
        title="Sign in"
        onPress={() => signIn(email, password)}
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
