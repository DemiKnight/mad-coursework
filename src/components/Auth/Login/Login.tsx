import React, {useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {AuthContext} from '../../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../Auth';

type LoginNavProps = NativeStackScreenProps<AuthStackParams, 'Login'>;

export const Login = ({route, navigation}: LoginNavProps) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {signIn} = React.useContext(AuthContext);

  useEffect(() => {
    setEmail(route.params.initialEmail);
    setPassword(route.params.initialPassword);
  }, [route.params.initialEmail, route.params.initialPassword]);

  useEffect(() => {
    if (route.params.attemptLogin) {
      signIn(email, password);
    }
  }, [route.params.attemptLogin, email, password, signIn]);

  // todo improve or use third-party library
  const isSubmitDisabled = React.useMemo<boolean>(
    () => email !== '' && password !== '' && email?.includes('@'),
    [email, password],
  );

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        // editable={!isLoading}
        // selectTextOnFocus={!isLoading}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        // editable={!isLoading}
        // selectTextOnFocus={!isLoading}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        disabled={!isSubmitDisabled}
        title="Sign in"
        onPress={() => {
          setIsLoading(true);
          signIn(email, password);
        }}
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
