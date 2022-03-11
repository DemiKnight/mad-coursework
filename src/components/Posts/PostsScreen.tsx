import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostStackNavParams} from './PostNavScreen';
import {PostList} from './PostList/PostList';
import Keychain from 'react-native-keychain';

type PostNavProps = NativeStackScreenProps<PostStackNavParams, 'View'>;
export const PostsScreen = ({navigation}: PostNavProps) => {
  const [userId, setUserId] = React.useState<number>();

  React.useMemo(async () => {
    const creds = await Keychain.getGenericPassword();
    if (creds) {
      setUserId(parseInt(creds.username, 10));
    } else {
    }
  }, []);

  return (
    <View style={styles.postScreenWrapper}>
      <View style={styles.controlButtonWrappers}>
        <Button
          title="Create post"
          onPress={() => navigation.navigate('Create', {userId: userId})}
        />
        <Button
          title="Draft Posts"
          onPress={() => navigation.navigate('Draft')}
        />
        <Button
          title="Scheduled Posts"
          onPress={() => navigation.navigate('Schedule')}
        />
      </View>
      <Divider />
      {userId && <PostList userId={userId} />}
    </View>
  );
};

const styles = StyleSheet.create({
  postScreenWrapper: {
    flex: 1,
  },
  controlButtonWrappers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
});
