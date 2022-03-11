import React from 'react';
import {Button, Divider} from 'react-native-elements';
import {AppErrors, PublicUser} from '../../../services/utils/SpacebookRequests';
import {RowProfile} from '../RowProfile/RowProfile';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';
import {FriendStackParams} from '../FriendsNav';
import {addFriend} from '../../../api/Friends';
import {mapErrors} from '../../../api/RequestUtils';
import {ErrorButton} from '../../Common/ErrorButton';

export enum FriendRequestStatus {
  RequestSent,
  AlreadyFriend,
  Unknown,
}

export const FriendSearchOptions = (props: {
  user: PublicUser;
  isPublicSearch: boolean;
  nav: NativeStackNavigationProp<FriendStackParams, 'Search'>;
}) => {
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [friendRequestStatus, setFriendRequestStatus] =
    React.useState<FriendRequestStatus>(FriendRequestStatus.Unknown);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAddFriend = React.useCallback(() => {
    console.info(`Add friend ${props.user.user_id}`);
    setIsLoading(true);
    async function sendFriendRequest() {
      const request = await addFriend(props.user.user_id);

      if (request.intendedResult !== undefined) {
        setFriendRequestStatus(FriendRequestStatus.RequestSent);
      } else {
        switch (request.errors) {
          case AppErrors.FriendAlreadyAdded:
            setFriendRequestStatus(FriendRequestStatus.AlreadyFriend);
            setErrors(['User already friend or existing friend request.']);
            break;
          default:
            setErrors(mapErrors(request.errors, 'Adding', 'Friend'));
        }
      }
    }
    sendFriendRequest();
    setIsLoading(false);
  }, [props.user, setFriendRequestStatus]);

  return (
    <SafeAreaView>
      <RowProfile
        target={props.user}
        optionsComponent={
          <View style={styles.profileOptions}>
            <ErrorButton errors={errors} />
            <Button
              icon={<Icon name="eyeo" size={20} />}
              type="outline"
              onPress={() => props.nav.navigate('Profile', {user: props.user})}
            />
            {props.isPublicSearch &&
              friendRequestStatus === FriendRequestStatus.Unknown && (
                <Button
                  icon={<Icon name="adduser" size={20} />}
                  type="outline"
                  onPress={handleAddFriend}
                  loading={isLoading}
                  disabled={isLoading}
                />
              )}
            {props.isPublicSearch &&
              friendRequestStatus === FriendRequestStatus.RequestSent && (
                <Button
                  icon={
                    <Icon name="check" size={20} style={styles.acceptedText} />
                  }
                  type="outline"
                  disabled={true}
                />
              )}
            {props.isPublicSearch &&
              friendRequestStatus === FriendRequestStatus.AlreadyFriend && (
                <Button
                  icon={
                    <Icon name="close" size={20} style={styles.acceptedText} />
                  }
                  type="outline"
                  disabled={true}
                />
              )}
          </View>
        }
      />
      <Divider />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileOptions: {
    flexDirection: 'row',
  },
  acceptedText: {
    color: 'green',
  },
  errorText: {
    color: 'red',
  },
});
