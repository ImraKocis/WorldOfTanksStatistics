import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import reactNativeClearAppCache from 'react-native-clear-app-cache';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

    reactNativeClearAppCache.clearAppCache();
  };
  useEffect(() => {}, []);
  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;
    var status, access_token, nickname, account_id, expires_at;
    if (url.includes('status=ok')) {
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

      loginDataObject && setIsLogedIn(true);
    } else if (url.includes('status=error')) {
      console.log('error on auth');
    }
  };

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
    </SafeAreaProvider>
  );
}
