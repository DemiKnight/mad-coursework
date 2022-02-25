import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {Avatar, Button, Overlay, Text} from 'react-native-elements';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {initialsFromUser} from '../../../services/utils/UserUtils';

export type RowProfileProps = {
  target: PublicUser;
  optionsComponent?: React.ReactNode;
};

export const RowProfile = ({target, optionsComponent}: RowProfileProps) => {
  const [profilePic, setProfilePic] = React.useState(undefined);
  const [postNumber, setPostNumber] = React.useState(2);
  const [likesNumber, setlikesNumber] = React.useState(33);

  React.useEffect(() => {}, [profilePic]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {profilePic === undefined ? (
        <Avatar
          overlayContainerStyle={{backgroundColor: 'blue'}}
          size={'medium'}
          rounded
          title={initialsFromUser(target)}
        />
      ) : (
        <Avatar
          rounded
          size={'medium'}
          source={{
            uri: 'https://picsum.photos/200/300',
          }}
        />
      )}
      <View style={styles.middleColumn}>
        <Text>
          {target.user_givenname} {target.user_familyname}
        </Text>
        <Text style={styles.emailText}>{target.user_email}</Text>
      </View>
      <View style={[styles.middleColumn, styles.statsColumn]}>
        <Text>
          Posts: <Text style={styles.stat}>{postNumber}</Text>
        </Text>
        <Text>
          Likes: <Text style={styles.stat}>{likesNumber}</Text>
        </Text>
      </View>
      <View style={styles.optionButtonWrapper}>{optionsComponent}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  middleColumn: {
    marginLeft: 4,
    flexGrow: 1,
    flex: 2,
  },
  statsColumn: {
    flex: 1,
  },
  emailText: {
    color: '#808080',
  },
  stat: {
    fontWeight: 'bold',
  },
  optionButtonWrapper: {
    alignItems: 'center',
    flexGrow: 1,
    flex: 1,
  },
  overlayTest: {
    flex: 20,
  },
});
