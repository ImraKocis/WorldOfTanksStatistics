import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalAchievements from '../personal_data_screen/PersonalAchievements';
import PersonalVehicles from '../personal_data_screen/PersonalVehicles';
import PersonalDataScreen from '../personal_data_screen/PersonalDataScreen';
const Tab = createMaterialTopTabNavigator();
const PersonalDataTopTabNavigator = ({
  loginDataObject,
  handleSignOutButton,
}) => {
  return (
    <Tab.Navigator
      initialRouteName='PersonalData'
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#3b3b3b' },
      }}>
      <Tab.Screen name='PersonalData' options={{ tabBarLabel: 'SUMMARY' }}>
        {(props) => (
          <PersonalDataScreen
            {...props}
            loginDataObject={loginDataObject}
            handleSignOutButton={handleSignOutButton}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name='PersonalVehicles'
        component={PersonalVehicles}
        options={{ tabBarLabel: 'VEHICLES' }}
      />
      <Tab.Screen
        name='PersonalAchievements'
        component={PersonalAchievements}
        options={{ tabBarLabel: 'ACHIEVEMENTS' }}
      />
    </Tab.Navigator>
  );
};

export default PersonalDataTopTabNavigator;
