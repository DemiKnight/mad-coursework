import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PostsScreen} from './src/components/Home/PostsScreen';
import {Auth} from './src/components/Auth/Auth';
import {Handler} from './src/api/SpacebookClient';
import Keychain, {UserCredentials} from 'react-native-keychain';
import {
  LoginError,
  LoginResponse,
  RegisterErrors,
  RegisterResponse,
} from './src/services/utils/SpacebookRequests';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SettingsScreen} from './src/components/SettingsScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {login, logout, register} from './src/api/Auth';
import {FriendsNav} from './src/components/Friends/FriendsNav';
import {PostNavScreen} from './src/components/Posts/PostNavScreen';

export type RootStackParams = {
  Posts: undefined;
  Settings: undefined;
  Friends: undefined;
};

const TabNav = createBottomTabNavigator<RootStackParams>();

export type AuthContextT = {
  signIn: (
    username: string,
    password: string,
  ) => Promise<Handler<LoginError, LoginResponse>>;
  signUp: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => Promise<Handler<RegisterErrors, RegisterResponse>>;
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
    // We use Hermes, log whether it's enabled (it should always be)
    // @ts-ignore
    console.debug(`Is Hermes enabled? ${!!global.HermesInternal}`);

    // When app loads, obtain token.
    const obtainAuthToken = async () => {
      const store: false | UserCredentials =
        await Keychain.getGenericPassword();
      setState(prev => {
        return {
          ...prev,
          userToken: store === false ? undefined : store.password,
        };
      });
    };

    obtainAuthToken();
  }, []);

  const authContext = React.useMemo<AuthContextT>(
    () => ({
      signIn: async (username, password) => {
        const potentialToken: Handler<LoginError, LoginResponse> = await login(
          username,
          password,
        );
        console.log(`Handling Sign in ${JSON.stringify(potentialToken)}`);

        if (potentialToken.intendedResult !== undefined) {
          console.log('Intended result was defined');
          const result: LoginResponse = potentialToken.intendedResult;
          Keychain.setGenericPassword(
            String(potentialToken.intendedResult.id),
            potentialToken.intendedResult.token,
          );

          setTimeout(() => {
            setState(prev => ({
              ...prev,
              userToken: result.token,
            }));
          }, 100);
        } else {
          Keychain.resetGenericPassword();
          setTimeout(() => {
            setState(prev => ({
              ...prev,
              userToken: undefined,
            }));
          }, 100);
        }
        return potentialToken;
      },
      signUp: async (email, firstName, lastName, password) => {
        const potentialToken: Handler<RegisterErrors, RegisterResponse> =
          await register(email, firstName, lastName, password);

        return potentialToken;
      },
      signOut: async () => {
        console.log('Attempting signout');
        const signoutResult = await logout();
        if (signoutResult.intendedResult !== undefined) {
          console.log('Signout successful');
          Keychain.resetGenericPassword();
          setTimeout(() => {
            setState(prev => ({
              ...prev,
              userToken: undefined,
            }));
          }, 100);
        } else {
          Keychain.resetGenericPassword();
          setTimeout(() => {
            setState(prev => ({
              ...prev,
              userToken: undefined,
            }));
          }, 100);
        }
        return signoutResult;
      },
    }),
    [],
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          {state.userToken !== undefined ? (
            <TabNav.Navigator initialRouteName="Posts">
              <TabNav.Screen
                name="Posts"
                component={PostNavScreen}
                options={{headerShown: false}}
              />
              <TabNav.Screen
                name="Friends"
                component={FriendsNav}
                options={{headerShown: false}}
              />
              <TabNav.Screen name="Settings" component={SettingsScreen} />
            </TabNav.Navigator>
          ) : (
            <Auth />
          )}
        </AuthContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
