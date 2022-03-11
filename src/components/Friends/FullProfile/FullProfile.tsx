import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Divider, Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {getUserInfo, getUserProfilePicture} from '../../../api/User';
import {mapErrors} from '../../../api/RequestUtils';
import {ErrorButton} from '../../Common/ErrorButton';
import {FullProfileFriendOptions} from './FullProfileFriendOptions';
import {PostList} from '../../Posts/PostList/PostList';
import {ProfileAvatar} from '../RowProfile/ProfileAvatar';

type FriendsNavProps = NativeStackScreenProps<FriendStackParams, 'Profile'>;
export const FullProfile = ({route, navigation}: FriendsNavProps) => {
  const [targetUser, setTargetUser] = React.useState<PublicUser>(
    route.params.user,
  );
  const [nonUpdatedProfile, setNonUpdatedProfile] =
    React.useState<boolean>(true);

  const [errors, setErrors] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    async function getProfile() {
      const request = await getUserInfo(targetUser.user_id);
      if (request.intendedResult !== undefined) {
        setTargetUser(request.intendedResult);
      } else {
        setErrors(mapErrors(request.errors));
      }
    }

    if (nonUpdatedProfile) {
      getProfile();
      setNonUpdatedProfile(false);
    }
  }, [nonUpdatedProfile, targetUser]);

  return (
    <View style={styles.fullProfileWrapper}>
      <ErrorButton errors={errors} />
      <View style={styles.fullProfileHeader}>
        <ProfileAvatar user={targetUser} avatarSize="xlarge" />

        <View>
          <Text style={styles.nameText}>
            {targetUser.user_givenname} {targetUser.user_familyname}
          </Text>

          <Text style={styles.emailText}>
            {targetUser.user_email}{' '}
            <Text style={styles.idText}>({targetUser.user_id})</Text>
          </Text>
        </View>
      </View>

      <View>
        <FullProfileFriendOptions
          userId={targetUser.user_id}
          nav={navigation}
        />
      </View>

      <PostList userId={targetUser.user_id} />
    </View>
  );
};

const styles = StyleSheet.create({
  fullProfileWrapper: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  fullProfileHeader: {
    flexDirection: 'row',
  },
  avatarContainer: {
    backgroundColor: 'blue',
  },
  profilePic: {},
  nameText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  emailText: {
    color: '#808080',
    fontSize: 15,
  },
  idText: {
    color: '#808080',
    fontSize: 10,
  },
});
