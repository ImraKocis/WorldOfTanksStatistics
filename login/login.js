import React, {useEffect, useState, Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

// create a component
const URL = "https://reactnativeforyou.com"
class MyClass extends Component {
    const [responseUrl , setResponseUrl] = useState();

  const getLoginUrl = async() => {
    const fetchedUrl= await fetch("https://api.worldoftanks.eu/wot/auth/login/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&display=page&nofollow=1",requestOptions)
    const url = await fetchedUrl.json();
    setResponseUrl(url);
  }
  useEffect(()=>{
    getLoginUrl();
     
  }, []);
  render() {
    return (
      <View style={styles.container}>
        <Text>MyClass</Text>
      </View>
    );
  }
  componentDidMount(){
    Linking.openURL(URL).catch((err) => console.error('An error occurred', err));
  }
}



// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default MyClass;