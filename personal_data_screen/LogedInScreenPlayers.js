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
      <PlayersList loginDataObject={loginDataObject} />
    </>
  );
};

export default LogedInScreenPlayers;
