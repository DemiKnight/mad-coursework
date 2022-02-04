import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {AuthContext} from '../../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../Auth';

type RegisterProps = NativeStackScreenProps<AuthStackParams, 'Register'>;

export const Register = ({navigation}: RegisterProps) => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const {signUp} = React.useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text>Register here:</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text>First & Last name</Text>
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
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
        onPress={() => signUp(email, firstName, lastName, password)}
      />
      <Button title="To Login" onPress={() => navigation.navigate('Login')} />
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
