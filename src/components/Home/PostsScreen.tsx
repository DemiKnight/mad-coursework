import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type PostStackNavParams = {
  View: undefined;
  Create: undefined;
  Draft: undefined;
  Schedule: undefined;
};

const PostStack = createNativeStackNavigator<PostStackNavParams>();

export const PostsScreen = () => {
  return (
    <SafeAreaView style={styles.homeText}>
      <View style={styles.controlButtonWrappers}>
        <Button title="Create post" />
        <Button title="Draft Posts" />
        <Button title="Scheduled Posts" />
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
