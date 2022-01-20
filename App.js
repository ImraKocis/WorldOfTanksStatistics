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
const styles = StyleSheet.create({
  appView: {
    flex: 1,
  },
});

export default function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [loginEndResponseOnlyUrl, setEndLoginResponseOnlyUrl] = useState('');
  const [loginDataObject, setLoginDataObject] = useState(null);

  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('status=ok')) {
      setEndLoginResponseOnlyUrl(url);
      const arrLogin = loginEndResponseOnlyUrl.split('&');
      setLoginDataObject({
        status: arrLogin[1],
        access_token: arrLogin[2],
        nickname: arrLogin[3],
        account_id: arrLogin[4],
        expires_at: arrLogin[5],
      });
      console.log(loginDataObject);
      //loginDataObject && navigation.navigate('Players');
    }
  };

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Players') {
              iconName = focused ? 'ios-people' : 'ios-people-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name='Home'
          component={MainScreen}
          handleLoginButton={handleLoginButton}></Tab.Screen>

        <Tab.Screen name='Players' component={PersonalDataScreen}></Tab.Screen>

        {/* <Drawer.Screen name='Tenkopedia'></Drawer.Screen> */}
        {/* <Drawer.Screen name='Clans'></Drawer.Screen> */}
      </Tab.Navigator>
    );
  }
  return (
    <SafeAreaProvider>
      <SignOutNvigator
        handleWebViewNavigationStateChange={handleWebViewNavigationStateChange}
      />
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
