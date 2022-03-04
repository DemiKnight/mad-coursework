import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';
import {FriendStackParams} from '../FriendsNav';
import {AppErrors, PublicUser} from '../../../services/utils/SpacebookRequests';
import {getFriendList} from '../../../api/Friends';
import {mapErrors} from '../../../api/RequestUtils';
import Icon from 'react-native-vector-icons/AntDesign';

export const FullProfileFriendOptions = (props: {
  userId: number;
  nav: NativeStackNavigationProp<FriendStackParams, 'Profile'>;
}) => {
  // will be undefined if not on your friends list.
  const [friendsList, setFriendsList] = React.useState<
    Array<PublicUser> | undefined
  >(undefined);
  const [errors, setErrors] = React.useState<Array<string>>([]);

  React.useMemo(async () => {
    const request = await getFriendList(props.userId);
    if (request.intendedResult !== undefined) {
      setFriendsList(request.intendedResult);
    } else {
      switch (request.errors) {
        case AppErrors.FriendListVisibility:
          // setFriendsList(undefined); should already be undefined
          break;
        default:
          setErrors(mapErrors(request.errors));
      }
    }

    // async function getFriendsListReq() {}
    // await getFriendsListReq();
  }, [props.userId]);
  const addFriend = React.useCallback(() => {}, []);

  if (friendsList === undefined) {
    return (
      <View>
        <Button
          icon={<Icon name="adduser" size={20} />}
          type="outline"
          onPress={addFriend}
          loading={false}
          disabled={false}
        />
      </View>
    );
  } else {
    return (
      <Button
        title={`${friendsList.length} friends`}
        onPress={() => {
          props.nav.navigate('FriendList', {friends: friendsList});
        }}
      />
    );
  }
};
