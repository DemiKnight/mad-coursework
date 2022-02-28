import React from 'react';
import {Button, Divider, Overlay, Text} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {RowProfile} from '../RowProfile/RowProfile';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';
import {FriendStackParams} from '../FriendsNav';
import {addFriend} from '../../../api/Friends';

export const FriendSearchOptions = (props: {
  user: PublicUser;
  isPublicSearch: boolean;
  nav: NativeStackNavigationProp<FriendStackParams, 'Search'>;
}) => {
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [errorOverlayVisible, setErrorOverlayVisible] = React.useState(false);
  const [sentFriendRequest, setSentFriendRequest] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAddFriend = React.useCallback(() => {
    console.log(`Add friend ${props.user.user_id}`);
    setIsLoading(true);
    async function sendFriendRequest() {
      const request = await addFriend(props.user.user_id);

      if (request.intendedResult !== undefined) {
        setSentFriendRequest(true);
      } else {
      }
    }

    sendFriendRequest();

    setIsLoading(false);
  }, [props.user, setSentFriendRequest]);

  return (
    <>
      <RowProfile
        target={props.user}
        optionsComponent={
          <View style={styles.profileOptions}>
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
              icon={<Icon name="eyeo" size={20} />}
              type="outline"
              onPress={() => props.nav.navigate('Profile', {user: props.user})}
            />
            {props.isPublicSearch && !sentFriendRequest && (
              <Button
                icon={<Icon name="adduser" size={20} />}
                type="outline"
                onPress={handleAddFriend}
                loading={isLoading}
                disabled={isLoading}
              />
            )}
            {props.isPublicSearch && sentFriendRequest && (
              <Button
                icon={
                  <Icon name="check" size={20} style={styles.acceptedText} />
                }
                type="outline"
                disabled={true}
              />
            )}
          </View>
        }
      />
      <Divider />
    </>
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
