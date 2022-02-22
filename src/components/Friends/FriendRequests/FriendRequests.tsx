import React, {useState} from 'react';
import {SafeAreaView, VirtualizedList} from 'react-native';
import {Button} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {RowProfile} from '../RowProfile/RowProfile';
import {getFriendRequests} from '../../../api/Friends';

export const FriendRequests = () => {
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
              <>
                <Button
                  title={'y'}
                  onPress={() => console.log(`Acceipt ${item.item.user_id}`)}
                />
                <Button
                  title={'n'}
                  onPress={() => console.log(`Reject ${item.item.user_id}`)}
                />
              </>
            }
          />
        )}
      />
    </SafeAreaView>
  );
};
