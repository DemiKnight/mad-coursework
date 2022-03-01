import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {FriendsListScreen} from '../FriendsListScreen';
import {FriendSearch} from './FriendSearch/FriendSearch';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {FriendRequests} from './FriendRequests/FriendRequests';
import {PublicUser} from '../../services/utils/SpacebookRequests';
import {FullProfile} from './FullProfile/FullProfile';
export type FriendStackParams = {
  List: undefined;
  Search: undefined;
  FriendRequests: undefined;
  Profile: {
    user: PublicUser;
  };
};

const FriendsStack = createNativeStackNavigator<FriendStackParams>();

type FriendsNavProps = NativeStackScreenProps<FriendStackParams, 'List'>;
export const FriendsNav = ({navigation}: FriendsNavProps) => {
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
              onPress={() => navigation.navigate('FriendRequests')}
            />
          ),
          headerRight: () => (
            <Button
              icon={<Icon name="search1" size={20} color="#808080" />}
              title="Search"
              type="outline"
              onPress={() => navigation.navigate('Search')}
            />
          ),
        }}
      />
      <FriendsStack.Screen name="Search" component={FriendSearch} />
      <FriendsStack.Screen name="Profile" component={FullProfile} />
      <FriendsStack.Screen
        options={{headerTitle: 'Friend Requests'}}
        name="FriendRequests"
        component={FriendRequests}
      />
    </FriendsStack.Navigator>
  );
};
