import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export const Login = () => {
  return (
    <SafeAreaView style={styles.homeText}>
      <Text>Login Screen Placeholder</Text>
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
