import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import LoginView from './login/login';
import MainScreen from './main_screen/main_screen';
import WithoutLoginView from './without_login/WithoutLoginView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Players')}
          title='Go to Players'></Button>
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
            handleLoginButton={handleLoginButton}
            handleWithOutLoginButton={handleWithOutLoginButton}></Tab.Screen>
          <Tab.Screen name='Players' component={WithoutLoginView}></Tab.Screen>

          {/* <Drawer.Screen name='Tenkopedia'></Drawer.Screen> */}
          {/* <Drawer.Screen name='Clans'></Drawer.Screen> */}
        </Tab.Navigator>
      </NavigationContainer>
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
