import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FriendRequestsProps} from './FriendRequests';

export const FriendRequestOptions = (user: PublicUser) => {
  const {navigation} = useNavigation<FriendRequestsProps>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAccept = React.useCallback(() => {
    console.info(`Accept ${user.user_id}`);
    async function sendAcceptRequest() {}

    setIsLoading(true);
  }, [user, setIsLoading]);

  const handleReject = React.useCallback(() => {
    console.info(`Reject ${user.user_id}`);
    async function sendRejectRequest() {}

    setIsLoading(true);
  }, [user, setIsLoading]);

  return (
    <View style={styles.profileControls}>
      {isLoading ? (
        <Icon name="loading" size={30} />
      ) : (
        <>
          <Button
            icon={<Icon name="adduser" size={25} />}
            type="outline"
            onPress={handleAccept}
          />
          <Button
            icon={<Icon name="eyeo" size={25} />}
            type="outline"
            onPress={() => navigation.navigate('Profile', {user: user})}
          />
          <Button
            icon={<Icon name="delete" size={25} />}
            type="outline"
            onPress={handleReject}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  profileControls: {
    flexDirection: 'row',
    // justifyContent: 'center',
  },
});
