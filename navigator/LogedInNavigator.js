import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import LogedInScreen from '../personal_data_screen/LogedInScreen';
import PersonalPlayerDataNavigator from './PersonalPlayerDataNavigator';
import SearchNavigator from './SearchNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ScreenTabNavigator = ({ loginDataObject, handleSignOutButton }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'My Account') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'Players') {
            iconName = focused ? 'ios-people' : 'ios-people-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
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

      <Tab.Screen name='Players'>
        {(props) => (
          <PersonalPlayerDataNavigator
            {...props}
            loginDataObject={loginDataObject}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name='Search'>
        {(props) => <SearchNavigator {...props} />}
      </Tab.Screen>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LogedInNavigator;
