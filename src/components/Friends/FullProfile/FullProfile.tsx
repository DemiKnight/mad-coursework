import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';

type FriendsNavProps = NativeStackScreenProps<FriendStackParams, 'Profile'>;
export const FullProfile = ({route, navigation}: FriendsNavProps) => {
  return (
    <SafeAreaView>
      <Text>{route.params.user.user_email}</Text>
    </SafeAreaView>
  );
};
