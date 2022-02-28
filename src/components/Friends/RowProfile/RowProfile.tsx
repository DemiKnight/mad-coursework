import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {Avatar, Text} from 'react-native-elements';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {initialsFromUser} from '../../../services/utils/UserUtils';
import {RowProfileStats} from './RowProfileStats';

export type RowProfileProps = {
  target: PublicUser;
  optionsComponent?: React.ReactNode;
};

export const RowProfile = ({target, optionsComponent}: RowProfileProps) => {
  const [profilePic] = React.useState(undefined);

  React.useEffect(() => {}, [profilePic]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {profilePic === undefined ? (
        <Avatar
          overlayContainerStyle={[styles.avatarContainer]}
          size={'medium'}
          rounded
          containerStyle={[styles.avatarColumn]}
          title={initialsFromUser(target)}
        />
      ) : (
        <Avatar
          rounded
          containerStyle={[styles.avatarColumn]}
          size={'medium'}
          source={{
            uri: 'https://picsum.photos/200/300',
          }}
        />
      )}
      <View style={[styles.middleColumn, styles.nameColumn]}>
        <Text>
          {target.user_givenname} {target.user_familyname}
        </Text>
        <Text style={styles.emailText}>{target.user_email}</Text>
      </View>
      <RowProfileStats
        user={target}
        containerStyling={[styles.middleColumn, styles.statsColumn]}
      />
      <View style={[styles.optionButtonWrapper]}>{optionsComponent}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  debug: {
    // borderColor: '#09090909',
    // borderWidth: 2,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    flex: 1,
  },
  avatarColumn: {},
  avatarContainer: {
    backgroundColor: 'blue',
  },
  nameColumn: {
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  middleColumn: {
    marginLeft: 4,
  },
  statsColumn: {
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 80,
  },
  emailText: {
    color: '#808080',
    fontSize: 10,
  },
  optionButtonWrapper: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 200,
  },
});
