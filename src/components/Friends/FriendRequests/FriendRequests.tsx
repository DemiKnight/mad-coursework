import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, VirtualizedList} from 'react-native';
import {Button} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {RowProfile} from '../RowProfile/RowProfile';
import {getFriendRequests} from '../../../api/Friends';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import Icon from 'react-native-vector-icons/AntDesign';

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
              <View style={styles.profileControls}>
                <Button
                  icon={<Icon name="adduser" size={25} />}
                  type="outline"
                  onPress={() => console.log(`Accept ${item.item.user_id}`)}
                />
                <Button
                  icon={<Icon name="eyeo" size={25} />}
                  type="outline"
                  onPress={() =>
                    navigation.navigate('Profile', {user: item.item})
                  }
                />
                <Button
                  icon={<Icon name="delete" size={25} />}
                  type="outline"
                  onPress={() => console.log(`Reject ${item.item.user_id}`)}
                />
              </View>
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileControls: {
    flexDirection: 'row',
    // justifyContent: 'center',
  },
});
