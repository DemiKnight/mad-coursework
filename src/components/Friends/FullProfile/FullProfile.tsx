import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';

type FriendsNavProps = NativeStackScreenProps<FriendStackParams, 'Profile'>;
export const FullProfile = ({route, navigation}: FriendsNavProps) => {
  return (
    <SafeAreaView>
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
      <View>
        <Text>Posts here..</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePic: {},
  nameText: {},
  emailText: {},
});
