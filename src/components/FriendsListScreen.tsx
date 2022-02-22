import React from 'react';
import {SafeAreaView, StyleSheet, VirtualizedList} from 'react-native';
import {RowProfile, RowProfileProps} from './Friends/RowProfile/RowProfile';
import {PublicUser} from '../services/utils/SpacebookRequests';
import {getFriendList} from '../api/Friends';
import {Text} from 'react-native-elements';

export const FriendsListScreen = () => {
  const [friendListData, setFriendListData] = React.useState<Array<PublicUser>>(
    [],
  );
  // const [errors, setErrors] = React.useState([]);

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
        renderItem={item => <RowProfile target={item.item} />}
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
