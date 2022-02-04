import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import LoginView from './login/login';
import MainScreen from './main_screen/main_screen';
import WithoutLoginView from './without_login/WithoutLoginView';
import PersonalDataScreen from './personal_data_screen/PersonalDataScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SignOutNvigator from './navigator/SignOutNvigator';
import LogedInNavigator from './navigator/LogedInNavigator';
import useForceUpdate from './komponente/forceUpdate';

const styles = StyleSheet.create({
  appView: {
    flex: 1,
  },
});
const requestOptions = {
  method: 'POST',
};
export default function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const [loginEndResponseOnlyUrl, setEndLoginResponseOnlyUrl] = useState('');
  const [loginDataObject, setLoginDataObject] = useState(null);
  const forceUpdate = useForceUpdate;
  handleSignOutButton = () => {
    fetch(
      'https://api.worldoftanks.eu/wot/auth/logout/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&access_token=' +
        loginDataObject.access_token,
      requestOptions
    )
      .then(setLoginDataObject(null))
      .then(setIsLogedIn(false));
  };
  useEffect(() => {}, []);
  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;
    var status, access_token, nickname, account_id, expires_at;
    if (url.includes('status=ok')) {
      setEndLoginResponseOnlyUrl(url);
      const arrLogin = url.split('&');

      status = arrLogin[1].split('=');
      access_token = arrLogin[2].split('=');
      nickname = arrLogin[3].split('=');
      account_id = arrLogin[4].split('=');
      expires_at = arrLogin[5].split('=');

      setLoginDataObject({
        status: status[1],
        access_token: access_token[1],
        nickname: nickname[1],
        account_id: account_id[1],
        expires_at: expires_at[1],
      });
      //console.log(loginDataObject);
      loginDataObject && setIsLogedIn(true);
    } else if (url.includes('status=error')) {
      console.log('error on auth');
    }
  };

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      {!isLogedIn ? (
        <SignOutNvigator
          handleWebViewNavigationStateChange={
            handleWebViewNavigationStateChange
          }
        />
      ) : (
        <LogedInNavigator
          loginDataObject={loginDataObject}
          handleSignOutButton={handleSignOutButton}
        />
      )}

      {/* <StatusBar hidden></StatusBar> */}
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            options={{ headerShown: false }}
            name='Home'
            component={HomeTabs}></Stack.Screen>
          <Stack.Screen name='Login'>
            {(props) => (
              <LoginView
                {...props}
                handleWebViewNavigationStateChange={
                  handleWebViewNavigationStateChange
                }
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer> */}
    </SafeAreaProvider>
    // <View style={styles.appView}>
    //   {isLoginPressed ? (
    //     <LoginView
    //       handleWebViewNavigationStateChange={
    //         handleWebViewNavigationStateChange
    //       }
    //     />
    //   ) : (
    //     <MainScreen
    //       handleLoginButton={handleLoginButton}
    //       handleWithOutLoginButton={handleWithOutLoginButton}
    //     />
    //   )}
    // </View>
  );
}
