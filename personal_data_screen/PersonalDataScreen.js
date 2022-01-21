import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useForceUpdate from '../komponente/forceUpdate';
const styles = StyleSheet.create({
  sammaryView: { backgroundColor: '#2d322d', flex: 1 },
  topTextView: { flex: 1, flexDirection: 'row' },
  bottomTextView: { flex: 1, flexDirection: 'row' },
  topLeftTextView: {
    margin: 10,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  topRightTextView: {
    margin: 10,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  bottomLeftTextView: {
    margin: 10,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  bottomCenterTextView: {
    margin: 10,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomRightTextView: {
    margin: 10,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  textView: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
  },
  statsText: { color: 'white', fontSize: 20, marginTop: 2 },
  headerText: { color: '#5c5c5c', fontSize: 16 },
  clanView: {},
  emblemView: {},
  nicknameText: {},
});
const requestOptions = {
  method: 'GET',
};
const PersonalDataScreen = ({ loginDataObject }) => {
  const [personalDataObject, setPersonalDataObject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const forceUpdate = useForceUpdate();

  const personalDataUrl =
    'https://api.worldoftanks.eu/wot/account/info/?account_id=' +
    loginDataObject.account_id +
    '&application_id=3b94e8ffc3a72fc5fcbc1477907b386f&access_token=' +
    loginDataObject.access_token +
    '&extra=statistics.random%2C+statistics.ranked_10x10';
  // console.log(loginDataObject);
  // console.log(personalDataUrl);
  Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  };
  const getPersonalData = async () => {
    const response = await fetch(personalDataUrl, requestOptions);
    return await response.json();
  };
  useEffect(() => {
    loadUrl();
  }, []);

  const loadUrl = async () => {
    const response = await getPersonalData();
    setPersonalDataObject(response);

    setIsLoaded(true);
    forceUpdate();

    //console.log('isloaded: ', personalDataObject);
  };
  var acc_id_str = loginDataObject.account_id.toString();

  return (
    <SafeAreaProvider>
      <StatusBar hidden></StatusBar>
      {isLoaded ? (
        <View style={styles.sammaryView}>
          <View style={styles.topTextView}>
            <View style={styles.topLeftTextView}>
              <Text style={styles.headerText}>Battles</Text>
              <Text style={styles.statsText}>
                {Object.byString(
                  personalDataObject,
                  'data.' + acc_id_str + '.account_id'
                )}
              </Text>
            </View>
            <View style={styles.topRightTextView}>
              <Text style={styles.headerText}>Battles</Text>
              <Text style={styles.statsText}>
                {Object.byString(
                  personalDataObject,
                  'data.' + acc_id_str + '.account_id'
                )}
              </Text>
            </View>
          </View>
          <View style={styles.bottomTextView}>
            <View style={styles.bottomLeftTextView}>
              <Text style={styles.headerText}>Battles</Text>
              <Text style={styles.statsText}>
                {Object.byString(
                  personalDataObject,
                  'data.' + acc_id_str + '.account_id'
                )}
              </Text>
            </View>
            <View style={styles.bottomCenterTextView}>
              <Text style={styles.headerText}>Battles</Text>
              <Text style={styles.statsText}>
                {Object.byString(
                  personalDataObject,
                  'data.' + acc_id_str + '.account_id'
                )}
              </Text>
            </View>
            <View style={styles.bottomRightTextView}>
              <Text style={styles.headerText}>Battles</Text>
              <Text style={styles.statsText}>
                {Object.byString(
                  personalDataObject,
                  'data.' + acc_id_str + '.account_id'
                )}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaProvider>
  );
};

export default PersonalDataScreen;
