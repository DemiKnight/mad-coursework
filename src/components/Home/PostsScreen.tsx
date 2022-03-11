import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {PostStackNavParams} from '../Posts/PostNavScreen';

type PostNavProps = NativeStackScreenProps<PostStackNavParams, 'View'>;
export const PostsScreen = ({navigation}: PostNavProps) => {
  return (
    <SafeAreaView style={styles.homeText}>
      <View style={styles.controlButtonWrappers}>
        <Button
          title="Create post"
          onPress={() => navigation.navigate('Create')}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeText: {
    flex: 1,
  },
  controlButtonWrappers: {
    flex: 1,
    flexDirection: 'row',
  },
});
