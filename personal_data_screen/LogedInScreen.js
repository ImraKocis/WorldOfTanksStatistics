import React from 'react';
import { View, Text, Button } from 'react-native';
import PersonalDataTopTabNavigator from '../navigator/PersonalDataTopTabNavigator';
import { personalDataStyle } from './personalDataStyle';
const styles = personalDataStyle;

const LogedInScreen = ({ loginDataObject, handleSignOutButton }) => {
  return (
    <>
      <View style={styles.headerView}>
        <View style={styles.nicknameView}>
          <Text style={styles.nicknameText}>{loginDataObject.nickname}</Text>
        </View>
        <View style={styles.signOutView}>
          <Button
            onPress={handleSignOutButton}
            title='SIGN OUT'
            color='#f95813'
          />
        </View>
      </View>
      <PersonalDataTopTabNavigator
        loginDataObject={loginDataObject}
        handleSignOutButton={handleSignOutButton}></PersonalDataTopTabNavigator>
    </>
  );
};

export default LogedInScreen;
