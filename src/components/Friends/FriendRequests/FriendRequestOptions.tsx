import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {StyleSheet, View} from 'react-native';
import {Button, Overlay, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';
import {FriendStackParams} from '../FriendsNav';
import {acceptFriendRequest} from '../../../api/Friends';

enum OutcomeType {
  Accepted,
  Rejected,
}

export const FriendRequestOptions = (props: {
  user: PublicUser;
  nav: NativeStackNavigationProp<FriendStackParams, 'FriendRequests'>;
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [errorOverlayVisible, setErrorOverlayVisible] = React.useState(false);
  const [outcomeType, setOutcomeType] = React.useState<OutcomeType | undefined>(
    undefined,
  );

  const handleAccept = React.useCallback(async () => {
    console.info(`Accept ${props.user.user_id}`);

    async function sendAcceptRequest() {
      const resultRequest = await acceptFriendRequest(props.user.user_id);

      if (resultRequest.intendedResult !== undefined) {
      } else {
      }

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

  if (outcomeType === undefined) {
    return (
      <View style={styles.profileControls}>
        {errors.length !== 0 && (
          <>
            <Button
              icon={<Icon name="warning" color="red" size={20} />}
              onPress={() => setErrorOverlayVisible(true)}
              type={'clear'}
            />
            <Overlay
              isVisible={errorOverlayVisible}
              onBackdropPress={() => setErrorOverlayVisible(false)}>
              {errors.map(errorStr => (
                <Text key={errorStr} style={styles.errorText}>
                  {errorStr}
                </Text>
              ))}
            </Overlay>
          </>
        )}
        <Button
          icon={<Icon name="adduser" size={20} />}
          type="outline"
          onPress={handleAccept}
          loading={isLoading}
          disabled={isLoading}
        />
        <Button
          icon={<Icon name="eyeo" size={20} />}
          type="outline"
          onPress={() => props.nav.navigate('Profile', {user: props.user})}
        />
        <Button
          icon={<Icon name="delete" size={20} />}
          type="outline"
          onPress={handleReject}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    );
  } else {
    if (outcomeType === OutcomeType.Accepted) {
      return <Text style={styles.acceptedText}>Friend Request Accepted</Text>;
    } else {
      return <Text style={styles.errorText}>Friend Request Rejected</Text>;
    }
  }
};
const styles = StyleSheet.create({
  profileControls: {
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },
  acceptedText: {
    color: 'green',
  },
});
