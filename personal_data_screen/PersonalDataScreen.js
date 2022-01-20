import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const styles = StyleSheet.create({
  sammaryView: { backgroundColor: '#2d322d', flex: 1 },
  statsText: {},
  headerText: {},
  clanView: {},
  emblemView: {},
  nicknameText: {},
});
const PersonalDataScreen = () => {
  return (
    <SafeAreaProvider>
      <StatusBar hidden></StatusBar>
      <View style={styles.sammaryView}></View>
    </SafeAreaProvider>
  );
};

export default PersonalDataScreen;
