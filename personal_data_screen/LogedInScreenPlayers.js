import React from 'react';
import { View, Text, Button } from 'react-native';
import PersonalDataScreenPlayer from './PersonalDataScreenPlayer';
import PlayersList from './PlayersList';
import { personalDataStyle } from './personalDataStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const styles = personalDataStyle;

const LogedInScreenPlayers = ({ loginDataObject }) => {
  return (
    <>
      <Stack.Navigator initialRouteName='Player'>
        <Stack.Screen options={{ headerShown: false }} name='Player'>
          {(props) => (
            <PlayersList {...props} loginDataObject={loginDataObject} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default LogedInScreenPlayers;
