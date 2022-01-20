import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  Button,
  Pressable,
} from 'react-native';

const image_uri = {
  uri: 'https://i.pinimg.com/originals/e3/1e/73/e31e73ea76d155f29e6686335370723c.jpg',
};
const logo_uri = {
  uri: 'https://1000marcas.net/wp-content/uploads/2021/05/World-of-Tanks-logo-1024x461.png',
};
const styles = StyleSheet.create({
  image_container: {
    flex: 1,
    alignItems: 'center',
  },
  image_view: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 100,
    height: 110,
    width: 260,
  },
  text: {
    color: '#4d4d4d',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  overlay: {
    opacity: 1,
  },
  login_button: { margin: 30 },
  without_login_button: {
    elevation: 3,
    backgroundColor: 'black',
    opacity: 0.7,
    marginTop: 10,
    marginBottom: 10,
  },
  button_text: {
    color: 'white',
  },
  button_view: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20,
    width: 150,
  },
});
const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.image_container}>
      <View style={styles.image_view}>
        <Image
          source={image_uri}
          resizeMode='cover'
          blurRadius={10}
          style={styles.image}></Image>
      </View>
      <View style={styles.overlay}>
        <Image source={logo_uri} style={styles.logo}></Image>
        <Text style={styles.text}>Statistics</Text>
      </View>
      <View style={styles.button_view}>
        <Button
          style={styles.login_button}
          onPress={() => navigation.navigate('Login')}
          title='LOGIN'
          color='#f95813'
        />
      </View>
    </View>
  );
};

export default MainScreen;
