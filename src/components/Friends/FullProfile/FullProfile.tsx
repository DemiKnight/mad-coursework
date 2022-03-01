import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {getUserInfo} from '../../../api/User';
import {mapErrors} from '../../../api/RequestUtils';
import CommonStyles from '../../Common/CommonStyles';
import {
  initialsFromUser,
  UserToPubUser,
} from '../../../services/utils/UserUtils';
import {ErrorButton} from '../../Common/ErrorButton';

type FriendsNavProps = NativeStackScreenProps<FriendStackParams, 'Profile'>;
export const FullProfile = ({route}: FriendsNavProps) => {
  const [targetUser, setTargetUser] = React.useState<PublicUser>(
    route.params.user,
  );
  const [nonUpdatedProfile, setNonUpdatedProfile] =
    React.useState<boolean>(true);
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [profilePicURL, setProfilePicURL] = React.useState<string | undefined>(
    undefined,
  );

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
    <SafeAreaView style={CommonStyles.centreColumn}>
      <ErrorButton errors={errors} />

      {profilePicURL === undefined ? (
        <Avatar
          size={'large'}
          rounded
          overlayContainerStyle={[styles.avatarContainer]}
          title={initialsFromUser(targetUser)}
        />
      ) : (
        <Avatar
          rounded
          overlayContainerStyle={[styles.avatarContainer]}
          size={'large'}
          source={{
            uri: profilePicURL,
          }}
        />
      )}
      <View>
        <Text>Profile pic here</Text>
        <Text>
          {route.params.user.user_givenname} {route.params.user.user_familyname}
        </Text>
        <Text>{route.params.user.user_email}</Text>
      </View>
      <View>
        <Text>List of friends... or not if person isn't a friend.</Text>
      </View>
      <Text>{route.params.user.user_id}</Text>
      <View>
        <Text>Posts here..</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: 'blue',
  },
  profilePic: {},
  nameText: {},
  emailText: {},
});
