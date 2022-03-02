import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Divider, Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import {AppErrors, PublicUser} from '../../../services/utils/SpacebookRequests';
import {getUserInfo, getUserProfilePicture} from '../../../api/User';
import {mapErrors} from '../../../api/RequestUtils';
import CommonStyles from '../../Common/CommonStyles';
import {initialsFromUser} from '../../../services/utils/UserUtils';
import {ErrorButton} from '../../Common/ErrorButton';
import {getFriendList} from '../../../api/Friends';
import Icon from 'react-native-vector-icons/AntDesign';

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
  // will be undefined if not on your friends list. Otherwise (f
  const [friendsList, setFriendsList] = React.useState<
    Array<PublicUser> | undefined
  >(undefined);

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

  React.useMemo(() => {
    async function getFriendsListReq() {
      const request = await getFriendList(targetUser.user_id);
      if (request.intendedResult !== undefined) {
        setFriendsList(request.intendedResult);
      } else {
        switch (request.errors) {
          case AppErrors.FriendListVisibility:
            // setFriendsList(undefined); should already be undefined
            break;
          default:
            setErrors(mapErrors(request.errors));
        }
      }
    }
    getFriendsListReq();
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
        {route.params.user.user_givenname} {route.params.user.user_familyname}
      </Text>

      <Text style={styles.emailText}>{route.params.user.user_email}</Text>

      <View>
        <Text>List of friends... or not if person isn't a friend.</Text>
        {friendsList === undefined ? (
          <Button icon={<Icon name="" />} onPress={() => {}} />
        ) : (
          <Button
            title={`${friendsList.length} friends`}
            onPress={() => {
              navigation.navigate('FriendList', {friends: friendsList});
            }}
          />
        )}
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
  nameText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  emailText: {
    color: '#808080',
    fontSize: 15,
  },
});
