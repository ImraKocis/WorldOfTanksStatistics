import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalAchievements from '../personal_data_screen/PersonalAchievements';
import PersonalDataScreen from '../personal_data_screen/PersonalDataScreen';
const Tab = createMaterialTopTabNavigator();
const PersonalDataTopTabNavigator = ({ loginDataObject }) => {
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
          <PersonalDataScreen {...props} loginDataObject={loginDataObject} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name='PersonalAchievements'
        options={{ tabBarLabel: 'ACHIEVEMENTS' }}>
        {(props) => (
          <PersonalAchievements {...props} loginDataObject={loginDataObject} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default PersonalDataTopTabNavigator;
