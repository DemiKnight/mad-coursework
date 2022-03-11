import React from 'react';
import {View} from 'react-native';
import {AuthContext} from '../../../App';
import {Button, Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SettingsStackNavParams} from './SettingsNav';
import Keychain from 'react-native-keychain';
import {PublicUser} from '../../services/utils/SpacebookRequests';
import {getUserInfo} from '../../api/User';
import {ErrorButton} from '../Common/ErrorButton';
import {mapErrors} from '../../api/RequestUtils';

type SettingsMenuProps = NativeStackScreenProps<SettingsStackNavParams, 'Menu'>;
export const SettingsMenuScreen = ({navigation}: SettingsMenuProps) => {
  const [currentUser, setCurrentUser] = React.useState<PublicUser>();
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const {signOut} = React.useContext(AuthContext);

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

  return (
    <View>
      <ErrorButton errors={errors} />
      {currentUser && (
        <>
          <Text>{currentUser.user_givenname}</Text>
          <Button
            title="Edit Profile"
            onPress={() =>
              navigation.navigate('UpdateProfile', {
                user: currentUser,
              })
            }
          />
        </>
      )}
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
