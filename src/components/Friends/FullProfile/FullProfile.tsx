import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, Divider, Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {getUserInfo, getUserProfilePicture} from '../../../api/User';
import {mapErrors} from '../../../api/RequestUtils';
import CommonStyles from '../../Common/CommonStyles';
import {initialsFromUser} from '../../../services/utils/UserUtils';
import {ErrorButton} from '../../Common/ErrorButton';
import {FullProfileFriendOptions} from './FullProfileFriendOptions';
import {PostList} from '../../Posts/PostList/PostList';

type FriendsNavProps = NativeStackScreenProps<FriendStackParams, 'Profile'>;
export const FullProfile = ({route, navigation}: FriendsNavProps) => {
  const [targetUser, setTargetUser] = React.useState<PublicUser>(
    route.params.user,
  );
  const [nonUpdatedProfile, setNonUpdatedProfile] =
    React.useState<boolean>(true);
  const [profilePicURL, setProfilePicURL] = React.useState<string | undefined>(
    undefined,
  );

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

  React.useMemo(() => {
    async function getProfilePicture() {
      const request = await getUserProfilePicture(targetUser.user_id);
      if (request.intendedResult !== undefined) {
        setProfilePicURL(request.intendedResult);
      }
    }
    getProfilePicture();
  }, [targetUser.user_id]);

  return (
    <SafeAreaView style={CommonStyles.centreColumn}>
      <ErrorButton errors={errors} />

      {profilePicURL === undefined ? (
        <Avatar
          size={'xlarge'}
          rounded
          overlayContainerStyle={[styles.avatarContainer]}
          title={initialsFromUser(targetUser)}
        />
      ) : (
        <Avatar
          rounded
          overlayContainerStyle={[styles.avatarContainer]}
          size={'xlarge'}
          source={{
            uri: profilePicURL,
          }}
        />
      )}
      <Text style={styles.nameText}>
        {targetUser.user_givenname} {targetUser.user_familyname}
      </Text>

      <Text style={styles.emailText}>
        {targetUser.user_email}{' '}
        <Text style={styles.idText}>({targetUser.user_id})</Text>
      </Text>

      <View>
        <FullProfileFriendOptions
          userId={targetUser.user_id}
          nav={navigation}
        />
      </View>

      <PostList userId={targetUser.user_id} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
