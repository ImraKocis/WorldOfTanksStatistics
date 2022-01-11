import React,{useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import LoginView from "./login/login";
import MainScreen from './main_screen/main_screen';

const styles = StyleSheet.create({
  appView : {
    flex:1,
  },
}) 



export default function App() {
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [loginEndResponseOnlyUrl, setEndLoginResponseOnlyUrl] = useState('');

    const handleLoginButton = () =>{
      setIsLoginPressed(true);
    }
    handleWebViewNavigationStateChange = (newNavState) => {
      const { url } = newNavState;
      if (!url) return;
  
      if (url.includes('status=ok')){
          setEndLoginResponseOnlyUrl(url);
          const arrLogin = loginEndResponseOnlyUrl.split('&')
          console.log(arrLogin);
      }
    }
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
    <View style={styles.appView}>
      {isLoginPressed ? 
        <LoginView handleWebViewNavigationStateChange={handleWebViewNavigationStateChange}/> 
        : 
        <MainScreen handleLoginButton={handleLoginButton}/> }
    </View>
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


