import React, {useState} from 'react';
import {SafeAreaView, VirtualizedList} from 'react-native';
import {Button} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {RowProfile} from '../RowProfile/RowProfile';

export const FriendRequests = () => {
  const [friendRequestList, setFriendRequestList] = useState<Array<PublicUser>>(
    [],
  );

  React.useEffect(() => {
    const test: PublicUser[] = [...Array(19).keys()].map(
      index =>
        ({
          user_id: index,
          user_givenname: `JOhn ${index}`,
          user_familyname: `Smith ${index}`,
          user_email: `test${index}@example.com`,
        } as PublicUser),
    );

    console.log(`${test}`);
    setFriendRequestList(test);
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
