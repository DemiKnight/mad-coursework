import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {Avatar} from 'react-native-elements';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {initialsFromUser} from '../../../services/utils/UserUtils';

export const RowProfile = (target: PublicUser) => {
  const [profilePic, setProfilePic] = React.useState(undefined);

  return (
    <SafeAreaView>
      {profilePic === undefined ? (
        <Avatar rounded title={initialsFromUser(target)} />
      ) : (
        <Avatar
          rounded
          source={{
            uri: 'https://picsum.photos/200/300',
          }}
        />
      )}
    </SafeAreaView>
  );
};
