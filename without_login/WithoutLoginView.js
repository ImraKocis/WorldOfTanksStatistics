import React from 'react';
import { StyleSheet, Text } from 'react-native';
const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
});
const WithoutLoginView = () => {
  return <Text style={styles.text}>Jos malo pa sad će</Text>;
};

export default WithoutLoginView;
