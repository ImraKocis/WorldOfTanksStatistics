import React,{useEffect, useState, Component} from 'react';
import { NativeBaseProvider, Box, Text, Center,Linking, Modal, View } from 'native-base';
import { WebView } from 'react-native-webview';
import LoginView from "./login/login";





export default function App() {
  /* const [responseUrl , setResponseUrl] = useState();
  const [loginResponseOnlyUrl, setLoginResponseOnlyUrl] = useState('');
  const [loginResponse, setLoginResponse] = useState([]);


  const getLoginUrl = async() => {
    const fetchedUrl= await fetch("https://api.worldoftanks.eu/wot/auth/login/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&display=page&nofollow=1",requestOptions)
    const url = await fetchedUrl.json();
    setResponseUrl(url);
  }
  useEffect(()=>{
    getLoginUrl();
    console.log(responseUrl);
  }, []);
  
   
  setTimeout(function(){
    responseUrl && console.log(responseUrl);
  },5000) */
  
  // responseUrl && componentDidMount(){
  //   Linking.openURL(URL).catch((err) => console.error('An error occurred', err));
  // }
  
  return (
    //ovo sve u modal => https://stackoverflow.com/questions/46172901/how-to-close-a-react-native-webview
    
    
       <LoginView></LoginView>

  );
  /* handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('status=ok')){
      setLoginResponseOnlyUrl(url);
      console.log('pero' + loginResponseOnlyUrl)
    }
  } */
  
  
}


