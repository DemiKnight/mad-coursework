import React, {useMemo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {ProfileAvatar} from '../Friends/RowProfile/ProfileAvatar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SettingsStackNavParams} from './SettingsNav';
import {updateUserInfo} from '../../api/User';

type UpdateProfileProps = NativeStackScreenProps<
  SettingsStackNavParams,
  'UpdateProfile'
>;
export const UpdateProfileScreen = ({route}: UpdateProfileProps) => {
  const [firstName, setFirstName] = React.useState(
    route.params.user.user_givenname,
  );
  const [lastName, setLastName] = React.useState(
    route.params.user.user_familyname,
  );
  const [email, setEmail] = React.useState(route.params.user.user_email);
  const [password, setPassword] = React.useState('');

  const noChanges: boolean = React.useMemo(() => {
    return (
      firstName === route.params.user.user_givenname &&
      lastName === route.params.user.user_familyname &&
      email === route.params.user.user_email &&
      password === ''
    );
  }, [firstName, lastName, email, password, route.params.user]);

  const saveChanges = React.useCallback(async () => {
    if (!noChanges) {
      const includeFirstname =
        firstName === route.params.user.user_givenname ? undefined : firstName;

      const includeLastname =
        lastName === route.params.user.user_familyname ? undefined : lastName;

      const includeEmail =
        email === route.params.user.user_email ? undefined : email;

      const includePassword = password === '' ? undefined : password;

      const request = await updateUserInfo(
        route.params.user.user_id,
        includePassword,
        includeEmail,
        includeFirstname,
        includeLastname,
      );

      if (request.intendedResult !== undefined) {
      } else {
      }
    }
  }, [
    noChanges,
    firstName,
    route.params.user.user_givenname,
    route.params.user.user_email,
    route.params.user.user_familyname,
    route.params.user.user_id,
    lastName,
    email,
    password,
  ]);

  return (
    <View style={styles.updateProfileWrapper}>
      <View style={styles.avatarSection}>
        <ProfileAvatar user={route.params.user} avatarSize="medium" />
        <Button
          style={styles.avatarSectionChangeButton}
          type="outline"
          title="Change Profile Picture"
          icon={<Icon name="picture" size={30} />}
        />
      </View>

      <View>
        <Text style={[styles.inputFieldLabel]}>Email</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={[styles.inputField]}
          placeholder="Email"
        />
      </View>

      <View>
        <Text style={[styles.inputFieldLabel]}>First Name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="First Name"
          style={[styles.inputField]}
        />
      </View>

      <View>
        <Text style={[styles.inputFieldLabel]}>Last Name</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Last Name"
          style={[styles.inputField]}
        />
      </View>

      <View>
        <Text style={[styles.inputFieldLabel]}>New Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="New Password"
          style={[styles.inputField]}
        />
      </View>
      <Button title="Save" disabled={noChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  updateProfileWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    maxHeight: 500,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#808080',
    padding: 5,
  },
  inputFieldLabel: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  avatarSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarSectionChangeButton: {
    marginTop: 5,
  },
});
