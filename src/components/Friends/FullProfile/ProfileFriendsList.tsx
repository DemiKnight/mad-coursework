import React from 'react';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {SafeAreaView, VirtualizedList} from 'react-native';
import {RowProfile} from '../RowProfile/RowProfile';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';

export type ProfileFriendsListProps = NativeStackScreenProps<
  FriendStackParams,
  'FriendList'
>;
export const ProfileFriendsList = ({route}: ProfileFriendsListProps) => {
  return (
    <SafeAreaView>
      <VirtualizedList<PublicUser>
        data={route.params.friends}
        initialNumToRender={20}
        getItem={(data: Array<PublicUser>, index) => data[index]}
        keyExtractor={(item, _) => String(item.user_id)}
        getItemCount={x => x.length}
        renderItem={item => <RowProfile target={item.item} />}
      />
    </SafeAreaView>
  );
};
