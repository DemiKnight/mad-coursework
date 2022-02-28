import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, VirtualizedList} from 'react-native';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {RowProfile} from '../RowProfile/RowProfile';
import {getFriendRequests} from '../../../api/Friends';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import {FriendRequestOptions} from './FriendRequestOptions';
import {EmptyListPlaceholder} from '../../Common/EmptyListPlaceholder';

export type FriendRequestsProps = NativeStackScreenProps<
  FriendStackParams,
  'FriendRequests'
>;

export const FriendRequests = ({navigation}: FriendRequestsProps) => {
  const [friendRequestList, setFriendRequestList] = useState<Array<PublicUser>>(
    [],
  );

  React.useEffect(() => {
    async function obtainFriendRequestData() {
      const friendRequestData = await getFriendRequests();
      if (friendRequestData.intendedResult !== undefined) {
        setFriendRequestList(friendRequestData.intendedResult);
      } else {
        // TODO
      }
    }
    obtainFriendRequestData();
  }, [setFriendRequestList]);

  if (friendRequestList.length === 0) {
    return <EmptyListPlaceholder />;
  }

  return (
    <SafeAreaView>
      <VirtualizedList<PublicUser>
        data={friendRequestList}
        initialNumToRender={20}
        getItem={(data: Array<PublicUser>, index) => data[index]}
        keyExtractor={(item, _) => String(item.user_id)}
        getItemCount={x => x.length}
        renderItem={item => (
          <RowProfile
            target={item.item}
            optionsComponent={
              <FriendRequestOptions user={item.item} nav={navigation} />
            }
          />
        )}
      />
    </SafeAreaView>
  );
};
