import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {Text} from 'react-native-elements';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {RowProfileStats} from './RowProfileStats';
import {ProfileAvatar} from './ProfileAvatar';

export type RowProfileProps = {
  target: PublicUser;
  optionsComponent?: React.ReactNode;
};

export const RowProfile = ({target, optionsComponent}: RowProfileProps) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ProfileAvatar user={target} avatarSize="medium" />
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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    flex: 1,
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
