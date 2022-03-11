import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {getUserProfilePicture} from '../../../api/User';
import {initialsFromUser} from '../../../services/utils/UserUtils';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {AvatarProps} from 'react-native-elements/dist/avatar/Avatar';

export const ProfileAvatar = (props: {
  user: PublicUser;
  avatarSize: AvatarProps['size'];
}) => {
  const [profilePic, setProfilePicture] = React.useState<string | undefined>(
    undefined,
  );

  React.useEffect(() => {
    async function getProfilePicture() {
      const request = await getUserProfilePicture(props.user.user_id);
      if (request.intendedResult !== undefined) {
        setProfilePicture(request.intendedResult);
      }
    }
    // Any other errors, we'll just default to user initials.
    if (profilePic === undefined) {
      getProfilePicture();
    }
  }, [profilePic, props.user.user_id]);

  return (
    <SafeAreaView>
      {profilePic === undefined ? (
        <Avatar
          overlayContainerStyle={[styles.avatarContainer]}
          size={props.avatarSize}
          rounded
          title={initialsFromUser(props.user)}
        />
      ) : (
        <Avatar
          rounded
          size={props.avatarSize}
          source={{
            uri: profilePic,
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: 'blue',
  },
});
