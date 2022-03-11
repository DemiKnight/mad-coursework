import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {ProfileAvatar} from '../Friends/RowProfile/ProfileAvatar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SettingsStackNavParams} from './SettingsNav';

type UpdateProfileProps = NativeStackScreenProps<
  SettingsStackNavParams,
  'UpdateProfile'
>;
export const UpdateProfileScreen = ({route}: UpdateProfileProps) => {
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
        <TextInput style={[styles.inputField]} placeholder="Email" />
      </View>

      <View>
        <Text style={[styles.inputFieldLabel]}>First Name</Text>
        <TextInput placeholder="First Name" style={[styles.inputField]} />
      </View>

      <View>
        <Text style={[styles.inputFieldLabel]}>Last Name</Text>
        <TextInput placeholder="Last Name" style={[styles.inputField]} />
      </View>

      <View>
        <Text style={[styles.inputFieldLabel]}>New Password</Text>
        <TextInput placeholder="New Password" style={[styles.inputField]} />
      </View>
      <Button title="Save" />
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
