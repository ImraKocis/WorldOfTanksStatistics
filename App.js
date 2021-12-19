import React,{useEffect, useState, Component} from 'react';
import { NativeBaseProvider, Box, Text, Center,Linking } from 'native-base';
import { WebView } from 'react-native-webview';
//import loginData from "./login/login";



const requestOptions = {
    method: "GET",
  }

export default function App() {

  const [responseUrl , setResponseUrl] = useState();

  const getLoginUrl = async() => {
    const fetchedUrl= await fetch("https://api.worldoftanks.eu/wot/auth/login/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&display=page&nofollow=1",requestOptions)
    const url = await fetchedUrl.json();
    setResponseUrl(url);
  }
  useEffect(()=>{
    getLoginUrl();
     
  }, []);
  
   
  setTimeout(function(){
    responseUrl && console.log(responseUrl);
  },5000)
  
  // responseUrl && componentDidMount(){
  //   Linking.openURL(URL).catch((err) => console.error('An error occurred', err));
  // }
  
  return (
    <>
    <NativeBaseProvider>
    <Center flex={1}>
        <Text>World Of Tanks Statistics</Text>
      </Center>
    </NativeBaseProvider>
      
      {responseUrl && (
        <WebView source={{ uri: responseUrl.data.location }} />
      )}
    </>
    
    
  );
 

}


