import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FriendsListScreen} from '../FriendsListScreen';
import {FriendSearch} from './FriendSearch/FriendSearch';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
export type FriendStackParams = {
  List: undefined;
  Search: undefined;
  FriendRequests: undefined;
};

const FriendsStack = createNativeStackNavigator<FriendStackParams>();

export const FriendsNav = () => {
  return (
    <FriendsStack.Navigator initialRouteName="List">
      <FriendsStack.Screen
        name="List"
        component={FriendsListScreen}
        options={{
          headerTitle: 'Friends',
          headerLeft: () => (
            <Button
              title="Requests"
              type="outline"
              iconRight
              icon={<Icon name="user" size={20} color="#808080" />}
            />
          ),
          headerRight: () => (
            <Button
              icon={<Icon name="search1" size={20} color="#808080" />}
              title="Search"
              type="outline"
              onPress={() => {
                console.info('xx');
              }}
            />
          ),
        }}
      />
      <FriendsStack.Screen name="Search" component={FriendSearch} />
      <FriendsStack.Screen name="FriendRequests" component={FriendSearch} />
    </FriendsStack.Navigator>
  );
};
