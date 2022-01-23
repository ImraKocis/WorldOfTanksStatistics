import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainScreen from '../main_screen/main_screen';
import PersonalDataScreen from '../personal_data_screen/PersonalDataScreen';
import LogedInScreen from '../personal_data_screen/LogedInScreen';
import LoginView from '../login/login';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ScreenTabNavigator = ({ loginDataObject, handleSignOutButton }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'My Account') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'Players') {
            iconName = focused ? 'ios-people' : 'ios-people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name='My Account'>
        {(props) => (
          <LogedInScreen
            {...props}
            loginDataObject={loginDataObject}
            handleSignOutButton={handleSignOutButton}
          />
        )}
      </Tab.Screen>

      {/* <Tab.Screen name='Players' component={PersonalDataScreen}></Tab.Screen> */}

      {/* <Drawer.Screen name='Tenkopedia'></Drawer.Screen> */}
      {/* <Drawer.Screen name='Clans'></Drawer.Screen> */}
    </Tab.Navigator>
  );
};

const LogedInNavigator = ({ loginDataObject, handleSignOutButton }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{ headerShown: false }} name='Home'>
          {(props) => (
            <ScreenTabNavigator
              {...props}
              loginDataObject={loginDataObject}
              handleSignOutButton={handleSignOutButton}
            />
          )}
        </Stack.Screen>
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name='Payers'></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LogedInNavigator;
