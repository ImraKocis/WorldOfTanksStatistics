import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const PersonalVehicles = () => {
  const [vehiclesObject, setVehiclesObject] = useState(null);
  const [isLoaded, setIsLading] = useState(false);
  const [aditionalData, setAditionalData] = useState(null);

  return (
    <View style={styles.mainView}>
      <Text style={{ color: 'black' }}>personalAchievements</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default PersonalVehicles;
