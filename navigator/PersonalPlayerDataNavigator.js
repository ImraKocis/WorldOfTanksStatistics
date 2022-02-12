import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayersList from '../personal_data_screen/PlayersList';
import PersonalDataScreenPlayer from '../personal_data_screen/PersonalDataScreenPlayer';

const Stack = createNativeStackNavigator();
const PersonalPlayerDataNavigator = ({ loginDataObject }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='PlayersTab'>
        {(props) => (
          <PlayersList {...props} loginDataObject={loginDataObject} />
        )}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Player'>
        {(props) => <PersonalDataScreenPlayer {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default PersonalPlayerDataNavigator;
