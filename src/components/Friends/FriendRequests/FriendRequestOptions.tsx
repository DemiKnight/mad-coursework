import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';
import {FriendStackParams} from '../FriendsNav';

export const FriendRequestOptions = (props: {
  user: PublicUser;
  nav: NativeStackNavigationProp<FriendStackParams, 'FriendRequests'>;
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAccept = React.useCallback(async () => {
    console.info(`Accept ${props.user.user_id}`);

    async function sendAcceptRequest() {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    setIsLoading(true);
    await sendAcceptRequest();
  }, [props.user, setIsLoading]);

  const handleReject = React.useCallback(async () => {
    console.info(`Reject ${props.user.user_id}`);

    async function sendRejectRequest() {}

    setIsLoading(true);
    await sendRejectRequest();
  }, [props.user, setIsLoading]);

  return (
    <View style={styles.profileControls}>
      <Button
        icon={<Icon name="adduser" size={25} />}
        type="outline"
        onPress={handleAccept}
        loading={isLoading}
        disabled={isLoading}
      />
      <Button
        icon={<Icon name="eyeo" size={25} />}
        type="outline"
        onPress={() => props.nav.navigate('Profile', {user: props.user})}
      />
      <Button
        icon={<Icon name="delete" size={25} />}
        type="outline"
        onPress={handleReject}
        loading={isLoading}
        disabled={isLoading}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  profileControls: {
    flexDirection: 'row',
    // justifyContent: 'center',
  },
});
