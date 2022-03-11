import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../../../App';
import {Button, Text} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SettingsStackNavParams} from './SettingsNav';
import Keychain from 'react-native-keychain';
import {PublicUser} from '../../services/utils/SpacebookRequests';
import {getUserInfo} from '../../api/User';
import {ErrorButton} from '../Common/ErrorButton';
import {mapErrors} from '../../api/RequestUtils';
import {ProfileHeader} from '../Friends/FullProfile/ProfileHeader';

type SettingsMenuProps = NativeStackScreenProps<SettingsStackNavParams, 'Menu'>;
export const SettingsMenuScreen = ({route, navigation}: SettingsMenuProps) => {
  const [currentUser, setCurrentUser] = React.useState<PublicUser>();
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const {signOut} = React.useContext(AuthContext);

  React.useMemo(async () => {
    if (!currentUser || route.params?.refresh) {
      const userId = await Keychain.getGenericPassword();
      if (userId) {
        const request = await getUserInfo(parseInt(userId.username, 10));
        if (request.intendedResult !== undefined) {
          setCurrentUser(request.intendedResult);
          navigation.setParams({refresh: false});
        } else {
          setErrors(mapErrors(request.errors, 'Getting', 'User'));
        }
      }
    }
  }, [navigation, currentUser, route.params?.refresh]);

  return (
    <View style={styles.settingsMenuWrapper}>
      <ErrorButton errors={errors} />
      {currentUser && (
        <>
          <ProfileHeader user={currentUser} avatarSize={'large'} />
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
const styles = StyleSheet.create({
  settingsMenuWrapper: {
    padding: 5,
    flexDirection: 'column',
  },
});
