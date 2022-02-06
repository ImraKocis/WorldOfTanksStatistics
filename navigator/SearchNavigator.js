import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalDataScreenPlayer from '../personal_data_screen/PersonalDataScreenPlayer';
import PlayersSearch from '../players_search/PlayersSearch';

const Stack = createNativeStackNavigator();

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='PlayersSearch'>
        {(props) => <PlayersSearch {...props} />}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name='Player'>
        {(props) => <PersonalDataScreenPlayer {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default SearchNavigator;
