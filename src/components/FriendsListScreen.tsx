import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';
import {RowProfile} from './Friends/RowProfile/RowProfile';
import {PublicUser} from '../services/utils/SpacebookRequests';
import {getFriendList} from '../api/Friends';
import {Button, Divider, Overlay, Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from './Friends/FriendsNav';
import Icon from 'react-native-vector-icons/AntDesign';
import {EmptyListPlaceholder} from './Common/EmptyListPlaceholder';
import CommonStyles from './Common/CommonStyles';
import {mapErrors} from '../api/RequestUtils';

type FriendsListProps = NativeStackScreenProps<FriendStackParams, 'List'>;
export const FriendsListScreen = ({navigation}: FriendsListProps) => {
  const [friendListData, setFriendListData] = React.useState<Array<PublicUser>>(
    [],
  );
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [errorOverlayVisible, setErrorOverlayVisible] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    async function dataFn() {
      const request = await getFriendList(1);
      if (request.intendedResult !== undefined) {
        setFriendListData(request.intendedResult);
      } else {
        setErrors(mapErrors(request.errors));
      }
    }

    await dataFn();
    setRefreshing(false);
  }, [setFriendListData]);

  React.useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  if (friendListData.length === 0) {
    return (
      <SafeAreaView style={CommonStyles.centreColumn}>
        <EmptyListPlaceholder />
        <Button title="Refresh" onPress={onRefresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      {errors.length !== 0 && (
        <>
          <Button
            type="outline"
            onPress={() => setErrorOverlayVisible(true)}
            icon={<Icon name="warning" color="red" size={20} />}
          />
          <Overlay
            isVisible={errorOverlayVisible}
            onBackdropPress={() => setErrorOverlayVisible(false)}>
            <Text>Errors</Text>
            {errors.map(errorStr => (
              <Text key={errorStr} style={styles.errorText}>
                {errorStr}
              </Text>
            ))}
          </Overlay>
          <Divider />
        </>
      )}

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
  errorText: {
    color: 'red',
  },
});
