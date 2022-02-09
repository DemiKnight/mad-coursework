import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthContext, RootStackParams} from '../../../App';
import {Button} from 'react-native-elements';

type HomeScreenProps = NativeStackScreenProps<RootStackParams, 'Home'>;
export const Home = ({navigation}: HomeScreenProps) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.homeText}>
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
      {/*<Button title="Login" onPress={() => navigation.navigate('Login')} />*/}
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
