import React from 'react';
import {RefreshControl, StyleSheet, View, VirtualizedList} from 'react-native';
import {RowProfile} from './Friends/RowProfile/RowProfile';
import {PublicUser} from '../services/utils/SpacebookRequests';
import {getFriendList} from '../api/Friends';
import {Button, Divider} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from './Friends/FriendsNav';
import Icon from 'react-native-vector-icons/AntDesign';
import {EmptyListPlaceholder} from './Common/EmptyListPlaceholder';
import CommonStyles from './Common/CommonStyles';
import {mapErrors} from '../api/RequestUtils';
import {ErrorButton} from './Common/ErrorButton';
import Keychain from 'react-native-keychain';
import {getUserInfo} from '../api/User';

type FriendsListProps = NativeStackScreenProps<FriendStackParams, 'List'>;
export const FriendsListScreen = ({navigation}: FriendsListProps) => {
  const [friendListData, setFriendListData] = React.useState<Array<PublicUser>>(
    [],
  );
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [currentUser, setCurrentUser] = React.useState<PublicUser>();

  React.useMemo(async () => {
    if (!currentUser) {
      const userId = await Keychain.getGenericPassword();
      if (userId) {
        const request = await getUserInfo(parseInt(userId.username, 10));
        if (request.intendedResult !== undefined) {
          setCurrentUser(request.intendedResult);
        } else {
          setErrors(mapErrors(request.errors, 'Getting', 'User'));
        }
      }
    }
  }, [currentUser]);

  const onRefresh = React.useCallback(async () => {
    async function dataFn() {
      if (currentUser !== undefined) {
        const request = await getFriendList(currentUser.user_id);
        if (request.intendedResult !== undefined) {
          setFriendListData(request.intendedResult);
        } else {
          setErrors(mapErrors(request.errors));
        }
      }
    }

    await dataFn();
    setRefreshing(false);
  }, [setFriendListData, currentUser]);

  React.useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  if (friendListData.length === 0) {
    return (
      <View style={CommonStyles.centreColumn}>
        <EmptyListPlaceholder />
        <Button title="Refresh" onPress={onRefresh} />
      </View>
    );
  }

  return (
    <View style={styles.friendsListWrapper}>
      <ErrorButton errors={errors} />

      {friendListData.length === 0 ? (
        <>
          <EmptyListPlaceholder />
          <Button title="Refresh" onPress={onRefresh} />
        </>
      ) : (
        <VirtualizedList<PublicUser>
          data={friendListData}
          initialNumToRender={20}
          getItem={(data: Array<PublicUser>, index) => data[index]}
          keyExtractor={(item, _) => String(item.user_id)}
          getItemCount={x => x.length}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                onRefresh();
              }}
            />
          }
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  friendsListWrapper: {
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
  errorText: {
    color: 'red',
  },
});
