import React, {useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {RowProfile} from '../RowProfile/RowProfile';
import {getFriendRequests} from '../../../api/Friends';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import {FriendRequestOptions} from './FriendRequestOptions';
import {EmptyListPlaceholder} from '../../Common/EmptyListPlaceholder';
import CommonStyles from '../../Common/CommonStyles';
import {Button} from 'react-native-elements';
import {mapErrors} from '../../../api/RequestUtils';
import {ErrorButton} from '../../Common/ErrorButton';

export type FriendRequestsProps = NativeStackScreenProps<
  FriendStackParams,
  'FriendRequests'
>;

export const FriendRequests = ({navigation}: FriendRequestsProps) => {
  const [friendRequestList, setFriendRequestList] = useState<Array<PublicUser>>(
    [],
  );
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const onRefresh = React.useCallback(async () => {
    async function obtainFriendRequestData() {
      const friendRequestData = await getFriendRequests();
      if (friendRequestData.intendedResult !== undefined) {
        setFriendRequestList(friendRequestData.intendedResult);
      } else {
        setErrors(mapErrors(friendRequestData.errors));
      }
    }
    await obtainFriendRequestData();
    setRefreshing(false);
  }, [setFriendRequestList]);

  React.useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <SafeAreaView style={CommonStyles.centreColumn}>
      <ErrorButton errors={errors} />
      {friendRequestList.length === 0 ? (
        <>
          <EmptyListPlaceholder />
          <Button title="Refresh" onPress={onRefresh} />
        </>
      ) : (
        <VirtualizedList<PublicUser>
          data={friendRequestList}
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
            <RowProfile
              target={item.item}
              optionsComponent={
                <FriendRequestOptions user={item.item} nav={navigation} />
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
});
