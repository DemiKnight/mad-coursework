import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {Avatar, Button, Overlay, Text} from 'react-native-elements';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {initialsFromUser} from '../../../services/utils/UserUtils';
import {RowProfileStats} from './RowProfileStats';

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
          containerStyle={[styles.avatarColumn, styles.debug]}
          title={initialsFromUser(target)}
        />
      ) : (
        <Avatar
          rounded
          containerStyle={[styles.avatarColumn, styles.debug]}
          size={'medium'}
          source={{
            uri: 'https://picsum.photos/200/300',
          }}
        />
      )}
      <View style={[styles.middleColumn, styles.nameColumn, styles.debug]}>
        <Text>
          {target.user_givenname} {target.user_familyname}
        </Text>
        <Text style={styles.emailText}>{target.user_email}</Text>
      </View>
      <RowProfileStats
        user={target}
        containerStyling={[
          styles.middleColumn,
          styles.statsColumn,
          styles.debug,
        ]}
      />
      <View style={[styles.optionButtonWrapper, styles.debug]}>
        {optionsComponent}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  debug: {
    borderColor: '#09090909',
    borderWidth: 2,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    flex: 1,
  },
  avatarColumn: {},
  nameColumn: {
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  middleColumn: {
    marginLeft: 4,
  },
  statsColumn: {
    // flex: 1,
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 80,
    // flexShrink: 1,
    // width: 20,
  },
  emailText: {
    color: '#808080',
  },
  stat: {
    fontWeight: 'bold',
  },
  optionButtonWrapper: {
    alignItems: 'center',
    // flex: 2,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 200,
    borderColor: '#09090909',
    borderWidth: 2,
  },
  overlayTest: {
    flex: 20,
  },
});
