import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './src/components/Login/Login';
import {Home} from './src/components/Home/Home';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

type AppProps = {
  isLoading?: boolean;
  isSignout?: boolean;
  userToken?: string;
};

const App = () => {
  const [state, setState] = React.useState<AppProps>({
    isLoading: true,
    isSignout: false,
  });

  // React.useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
