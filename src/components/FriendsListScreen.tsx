import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {RowProfile} from './Friends/RowProfile/RowProfile';
import {PublicUser} from '../services/utils/SpacebookRequests';

export const FriendsListScreen = () => {
  const dummyUser: PublicUser = {
    user_id: 1,
    last_name: 'Knight',
    first_name: 'Alex',
    email: 'alex@alexknight.co.uk',
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <RowProfile
        user_id={dummyUser.user_id}
        email={dummyUser.email}
        first_name={dummyUser.first_name}
        last_name={dummyUser.last_name}
      />
      <RowProfile
        user_id={dummyUser.user_id}
        email={dummyUser.email}
        first_name={dummyUser.first_name}
        last_name={dummyUser.last_name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 7,
  },
  item: {
    marginBottom: 2,
  },
});
