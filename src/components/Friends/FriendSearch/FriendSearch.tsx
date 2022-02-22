import React from 'react';
import {SafeAreaView} from 'react-native';
import {Input} from 'react-native-elements';

export const FriendSearch = () => {
  return (
    <SafeAreaView>
      <Input placeholder="Search friend" autoCompleteType="off" />
    </SafeAreaView>
  );
};
