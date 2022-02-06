import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainScreen from '../main_screen/main_screen';
import PersonalDataScreen from '../personal_data_screen/PersonalDataScreen';
import SearchNavigator from './SearchNavigator';
import LoginView from '../login/login';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ScreenTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'LogIn') {
            iconName = focused ? 'ios-log-in' : 'ios-log-in-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name='LogIn' component={MainScreen}></Tab.Screen>

      <Tab.Screen name='Search'>
        {(props) => <SearchNavigator {...props} />}
      </Tab.Screen>

      {/* <Drawer.Screen name='Tenkopedia'></Drawer.Screen> */}
      {/* <Drawer.Screen name='Clans'></Drawer.Screen> */}
    </Tab.Navigator>
  );
};
const SignOutNvigator = ({ handleWebViewNavigationStateChange }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          options={{ headerShown: false }}
          name='Home'
          component={ScreenTabNavigator}></Stack.Screen>
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
    </NavigationContainer>
  );
};

export default SignOutNvigator;
