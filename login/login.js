import react, {useEffect, useState} from "react";
import {View, Text, StyleSheet, SafeAreaView} from "react-native"
import { WebView } from 'react-native-webview';
import { render } from "react-dom";
import LoadingService from "./services/loadingService";
import React from "react";
import useForceUpdate from "../komponente/forceUpdate";

  const requestOptions = {
    method: "GET",
  }
  const styles = StyleSheet.create({
    loading: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }
  })
const LoginView = ({handleWebViewNavigationStateChange}) =>  {
  
    const [loginFormUrl , setLoginFormUrl] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [loginResponse, setLoginResponse] = useState([]);
    const forceUpdate = useForceUpdate()
    const getLoginUrl = async () => {
      const response = await fetch('https://api.worldoftanks.eu/wot/auth/login/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&nofollow=1&display=page',requestOptions)
      return await response.json();
    }
    useEffect(()=>{
      loadUrl();
      
      // getLoginUrl()
      // loginFormUrl && setIsLoaded(true);
      // loginFormUrl && console.log(loginFormUrl)
      // forceUpdate()
      // const loginUrlPromise = new Promise((resolve)=> {
      //   fetch('https://api.worldoftanks.eu/wot/auth/login/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&nofollow=1&display=page',requestOptions)
      //     .then((response)=> response.json())
      //     .then((data)=>resolve(data))
      // })
      
      // loginUrlPromise.then(
      //   function (value) {
      //     setLoginFormUrl(value)
      //     loginFormUrl && setIsLoaded(true);
      //   }
      // )
    }, []);

    const loadUrl = async () => {
      const response = await getLoginUrl();
      setLoginFormUrl(response)
      setIsLoaded(true);
      forceUpdate()
      console.log("isloaded: ",isLoaded)
    }
    
      
      
      // handleWebViewNavigationStateChange = (newNavState) => {
      //   const { url } = newNavState;
      //   if (!url) return;
    
      //   if (url.includes('status=ok')){
      //       setEndLoginResponseOnlyUrl(url);
      //       const arrLogin = loginEndResponseOnlyUrl.split('&')
      //       console.log(arrLogin);
      //   }
      // }
      return(
        <SafeAreaView style={{flex:1}}>
          {isLoaded ? 
          <WebView
            source = {{uri: loginFormUrl.data.location}}
            onNavigationStateChange = {handleWebViewNavigationStateChange}
          /> :<View style={styles.loading}>
                <Text>Loading...</Text>
              </View>}
        </SafeAreaView>
      )
    }

  export default LoginView