import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ProfileAvatar} from '../RowProfile/ProfileAvatar';
import {PublicUser} from '../../../services/utils/SpacebookRequests';

export const ProfileHeader = (props: {
  avatarSize: ('small' | 'medium' | 'large' | 'xlarge') | number;
  user: PublicUser;
}) => {
  return (
    <View>
      <View style={styles.fullProfileHeader}>
        <ProfileAvatar user={props.user} avatarSize={props.avatarSize} />

        <View>
          <Text style={styles.nameText}>
            {props.user.user_givenname} {props.user.user_familyname}
          </Text>

          <Text style={styles.emailText}>
            {props.user.user_email}{' '}
            <Text style={styles.emailText}>({props.user.user_id})</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullProfileHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  emailText: {
    color: '#808080',
    fontSize: 15,
  },
});
