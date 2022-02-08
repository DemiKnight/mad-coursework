import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {AuthContext} from '../../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../Auth';
import {
  CommonHTTPErrors,
  RegisterErrors,
  RegisterResponse,
} from '../../../services/utils/SpacebookRequests';
import {Handler} from '../../../services/utils/SpacebookClient';

type RegisterProps = NativeStackScreenProps<AuthStackParams, 'Register'>;

export const Register = ({navigation}: RegisterProps) => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const {signUp} = React.useContext(AuthContext);

  // todo improve or use third-party library
  const isSubmitDisabled = React.useMemo<boolean>(
    () =>
      password !== '' &&
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      email?.includes('@') &&
      password.length > 5,
    [firstName, lastName, password, email],
  );

  const handleResponse = async (
    fn: Promise<Handler<RegisterResponse, RegisterErrors>>,
  ) => {
    const result = await fn;
    setIsLoading(false);
    if (result.intendedResult !== undefined) {
      navigation.navigate('Login', {
        initialUsername: email,
        initialPassword: password,
      });
    } else if (result === CommonHTTPErrors.BadRequest) {
      setError('Issue with Username & Password');
    } else {
      setError('Unknown error occurred, please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {error !== undefined ? <Text>{error}</Text> : <></>}
      <Text>Email</Text>
      <TextInput
        editable={!isLoading}
        selectTextOnFocus={!isLoading}
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text>First name</Text>
      <TextInput
        editable={!isLoading}
        selectTextOnFocus={!isLoading}
        autoCapitalize="words"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text>Last name</Text>
      <TextInput
        editable={!isLoading}
        selectTextOnFocus={!isLoading}
        autoCapitalize="words"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text>Password</Text>
      <TextInput
        editable={!isLoading}
        selectTextOnFocus={!isLoading}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Sign up"
        disabled={!isSubmitDisabled || isLoading}
        onPress={() => {
          setError('');
          setIsLoading(true);
          handleResponse(signUp(email, firstName, lastName, password));
        }}
      />
      {isLoading ? <Text>Loading...</Text> : <></>}
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
  wrapper: {
    padding: 40,
  },
});
