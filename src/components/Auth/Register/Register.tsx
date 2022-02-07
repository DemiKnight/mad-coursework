import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {AuthContext} from '../../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../Auth';
import {
  RegisterErrors,
  RegisterResponse,
} from '../../../services/utils/SpacebookRequests';

type RegisterProps = NativeStackScreenProps<AuthStackParams, 'Register'>;

export const Register = ({navigation}: RegisterProps) => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [registerRequest, setRegisterRequest] =
    React.useState<Promise<RegisterResponse | RegisterErrors>>(); // Use ReturnType<> from typescript

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

  React.useEffect(() => {
    if (registerRequest !== undefined) {
      setIsLoading(false);
      const handleRegisterRequest = async () => {
        const result: RegisterResponse | RegisterErrors = await registerRequest;
        if (result instanceof RegisterResponse) {
          navigation.navigate('Login'); // TODO Pass username & password?
        } else {
          setError(`Issue whilst registering: ${result}`);
        }
      };
      handleRegisterRequest();
    }
  }, [registerRequest, navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {error !== undefined ? <Text>{error}</Text> : <></>}
      <Text>Email</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text>First name</Text>
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text>Last name</Text>
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Sign up"
        disabled={!isSubmitDisabled}
        onPress={() => {
          setIsLoading(true);
          setRegisterRequest(signUp(email, firstName, lastName, password));
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
