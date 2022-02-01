import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './src/components/Auth/Login/Login';
import {Home} from './src/components/Home/Home';
import {Auth} from './src/components/Auth/Auth';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
};
const Stack = createNativeStackNavigator<RootStackParams>();

export type AuthContextT = {
  signIn: (username: string, password: string) => Promise<{token: string}>;
  signUp: (username: string, password: string) => Promise<{token: string}>;
  signOut: () => void;
};

export const AuthContext = React.createContext({} as AuthContextT);

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

  React.useEffect(() => {
    const obtainAuthToken = async () => {
      setState(prev => {
        // todo, acutally retrieve the authencatioin from storage.
        return {
          ...prev,
          userToken: undefined,
        };
      });
    };

    obtainAuthToken();
  }, []);

  const authContext = React.useMemo<AuthContextT>(
    () => ({
      signIn: (username, password) => {
        // console.log(username + password);
        setState(prev => ({...prev, userToken: `${username}${password}`}));
        return Promise.resolve({token: 'xx'});
      },
      signUp: (username, password) => {
        console.log(username + password);
        return Promise.resolve({token: 'xx'});
      },
      signOut: () => {},
    }),
    [],
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        {state.userToken !== undefined ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            {/*<Stack.Screen name="Login" component={Login} />*/}
          </Stack.Navigator>
        ) : (
          <Auth />
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;
