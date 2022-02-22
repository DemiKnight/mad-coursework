import React from 'react';
import {SafeAreaView, StyleSheet, Text, VirtualizedList} from 'react-native';
import {RowProfile} from './Friends/RowProfile/RowProfile';
import {PublicUser} from '../services/utils/SpacebookRequests';
import {getFriendList} from '../api/Friends';

export const FriendsListScreen = () => {
  const [friendListData, setFriendListData] = React.useState<Array<PublicUser>>(
    [],
  );
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    async function dataFn() {
      getFriendList(1).then(response => {
        if (response.intendedResult !== undefined) {
          console.log(response.intendedResult);
          setFriendListData(response.intendedResult);
        } else {
        }
      });
    }

    dataFn();
  }, [setFriendListData]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <VirtualizedList<PublicUser>
        data={friendListData}
        initialNumToRender={20}
        getItem={(data: Array<PublicUser>, index) => data[index]}
        keyExtractor={(item, _) => String(item.user_id)}
        getItemCount={x => x.length}
        renderItem={item => (
          <RowProfile
            user_id={item.item.user_id}
            user_email={item.item.user_email}
            user_givenname={item.item.user_givenname}
            user_familyname={item.item.user_familyname}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 7,
  },
  item: {
    marginBottom: 2,
  },
});
