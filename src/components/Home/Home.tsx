import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../App';

type HomeScreenProps = NativeStackScreenProps<RootStackParams, 'Home'>;
export const Home = ({navigation}: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.homeText}>
      <Text>Home</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
