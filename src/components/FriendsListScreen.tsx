import React from 'react';
import {SafeAreaView, StyleSheet, View, VirtualizedList} from 'react-native';
import {RowProfile} from './Friends/RowProfile/RowProfile';
import {PublicUser} from '../services/utils/SpacebookRequests';
import {getFriendList} from '../api/Friends';
import {Button, Divider} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from './Friends/FriendsNav';
import Icon from 'react-native-vector-icons/AntDesign';
import {EmptyListPlaceholder} from './Common/EmptyListPlaceholder';
import CommonStyles from './Common/CommonStyles';

type FriendsListProps = NativeStackScreenProps<FriendStackParams, 'List'>;
export const FriendsListScreen = ({navigation}: FriendsListProps) => {
  const [friendListData, setFriendListData] = React.useState<Array<PublicUser>>(
    [],
  );
  React.useEffect(() => {
    async function dataFn() {
      getFriendList(1).then(response => {
        if (response.intendedResult !== undefined) {
          console.log(response.intendedResult);
          setFriendListData(response.intendedResult);
        } else {
          // TODO Handle failure cases
        }
      });
    }

    dataFn();
  }, [setFriendListData]);

  if (friendListData.length === 0) {
    return (
      <SafeAreaView style={CommonStyles.centreColumn}>
        <EmptyListPlaceholder />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <VirtualizedList<PublicUser>
        data={friendListData}
        initialNumToRender={20}
        getItem={(data: Array<PublicUser>, index) => data[index]}
        keyExtractor={(item, _) => String(item.user_id)}
        getItemCount={x => x.length}
        renderItem={item => (
          <>
            <RowProfile
              target={item.item}
              optionsComponent={
                <View style={styles.profileOptions}>
                  <Button
                    icon={<Icon name="eyeo" size={20} />}
                    type="outline"
                    onPress={() =>
                      navigation.navigate('Profile', {user: item.item})
                    }
                  />
                </View>
              }
            />
            <Divider />
          </>
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
  optionsButton: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'center',
  },
  overlayTest: {
    flex: 20,
  },
  item: {
    marginBottom: 2,
  },
  profileOptions: {
    flexDirection: 'row',
  },
});
