import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Login} from './src/components/Login/Login';

type RootStackParams = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

type HomeScreenProps = NativeStackScreenProps<RootStackParams, 'Home'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.homeText}>
      <Text>Home</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  homeText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
