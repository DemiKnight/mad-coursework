import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/components/Home/Home';
import {Auth} from './src/components/Auth/Auth';
import {ResponseX, SpacebookClient} from './src/services/utils/SpacebookClient';
import Keychain, {UserCredentials} from 'react-native-keychain';
import {
  LoginError,
  LoginResponse,
  RegisterErrors,
  RegisterResponse,
} from './src/services/utils/SpacebookRequests';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
};
const Stack = createNativeStackNavigator<RootStackParams>();

export type AuthContextT = {
  signIn: (
    username: string,
    password: string,
  ) => Promise<LoginResponse | LoginError>;
  signUp: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => Promise<ResponseX<RegisterResponse, RegisterErrors>>;
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
        const potentialToken: LoginResponse | LoginError =
          await SpacebookClient.login(username, password);
        if (potentialToken instanceof LoginResponse) {
          setTimeout(() => {
            setState(prev => ({
              ...prev,
              userToken: potentialToken.session_token,
            }));
          }, 100);
        }
        return potentialToken;
      },
      signUp: async (email, firstName, lastName, password) => {
        const potentialToken: ResponseX<RegisterResponse, RegisterErrors> =
          await SpacebookClient.register(email, firstName, lastName, password);

        return potentialToken;
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
          </Stack.Navigator>
        ) : (
          <Auth />
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;
