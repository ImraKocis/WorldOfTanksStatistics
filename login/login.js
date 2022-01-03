import react, {useEffect, useState} from "react";
import {View, NativeBaseProvider, Text} from "native-base"
import { WebView } from 'react-native-webview';
import { render } from "react-dom";

const requestOptions = {
    method: "GET",
  }
const LoginView = () => {
  const [loginFormUrl , setLoginFormUrl] = useState();
  const [loginEndResponseOnlyUrl, setEndLoginResponseOnlyUrl] = useState('');
  const [loginResponse, setLoginResponse] = useState([]);


  const getLoginUrl = async() => {
    const fetchedUrl= await fetch("https://api.worldoftanks.eu/wot/auth/login/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&display=page&nofollow=1",requestOptions)
    const url = await fetchedUrl.json();
    setResponseUrl(url);
  }
  useEffect(()=>{
    //getLoginUrl();
    const loginUrlPromise = new Promise((resolve)=> {
        fetch('https://api.worldoftanks.eu/wot/auth/login/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&display=page&nofollow=1',requestOptions)
    })
    .then((response)=> response.json())
    .then((data)=>{
        resolve(data)
    })

    Promise.all(loginUrlPromise).then(
        (values) => {
            setLoginFormUrl(values)
        }
    )
    console.log(loginFormUrl);
  }, []);
  
   
  setTimeout(function(){
    loginFormUrl && console.log(loginFormUrl);
  },5000)
  
  // responseUrl && componentDidMount(){
  //   Linking.openURL(URL).catch((err) => console.error('An error occurred', err));
  // }
  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('status=ok')){
        setEndLoginResponseOnlyUrl(url);
      console.log('pero' + loginEndResponseOnlyUrl)
    }
  }

  
    return (
        
          
            <WebView
            source={{ uri: loginFormUrl.data.location }}
            onNavigationStateChange={this.handleWebViewNavigationStateChange} />
        
      );
  }
  
export default LoginView