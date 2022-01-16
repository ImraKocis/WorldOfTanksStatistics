import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import LoginView from './login/login';
import MainScreen from './main_screen/main_screen';
import WithoutLoginView from './without_login/WithoutLoginView';

const styles = StyleSheet.create({
  appView: {
    flex: 1,
  },
});

export default function App() {
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [loginEndResponseOnlyUrl, setEndLoginResponseOnlyUrl] = useState('');
  const [loginDataObject, setLoginDataObject] = useState({});
  const [isWithoutLoginPressed, setIsWithoutLoginPressed] = useState(false);

  const handleLoginButton = () => {
    setIsLoginPressed(true);
  };
  const handleWithOutLoginButton = () => {
    setIsWithoutLoginPressed(true);
  };
  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('status=ok')) {
      setEndLoginResponseOnlyUrl(url);
      const arrLogin = loginEndResponseOnlyUrl.split('&');
      console.log(arrLogin);
      setLoginDataObject({
        status: arrLogin[1],
        access_token: arrLogin[2],
        nickname: arrLogin[3],
        account_id: arrLogin[4],
        expires_at: arrLogin[5],
      });
    }
  };

  return (
    <View style={styles.appView}>
      {isLoginPressed ? (
        <LoginView
          handleWebViewNavigationStateChange={
            handleWebViewNavigationStateChange
          }
        />
      ) : (
        <MainScreen
          handleLoginButton={handleLoginButton}
          handleWithOutLoginButton={handleWithOutLoginButton}
        />
      )}
    </View>
  );
}
