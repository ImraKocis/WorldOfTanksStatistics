import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import PersonalDataScreenPlayer from './PersonalDataScreenPlayer';
import React, { useState, useEffect } from 'react';

const requestOptions = {
  method: 'GET',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
const PlayersList = ({ navigator, loginDataObject }) => {
  //https://api.worldoftanks.eu/wot/account/info/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&account_id=508372217&access_token=55e6d13518240a80f158aff285300b569d38a4df&extra=private.grouped_contacts
  const personalContactsUrl =
    'https://api.worldoftanks.eu/wot/account/info/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&account_id=' +
    loginDataObject.account_id +
    '&access_token=' +
    loginDataObject.access_token +
    '&extra=private.grouped_contacts';

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

  const [friendListUngrouped, setFriendListUngrouped] = useState(null); //arr id-a from data.private.ungruped
  const [friendListGrouped, setFrinedListGrouped] = useState(null); // friends from groups
  const [friendList, setFrinedList] = useState(null); // all forom frined list
  const test = [
    { id: 1, name: 'jedan' },
    { id: 2, name: 'dva' },
  ];
  const getPersonalContacts = async () => {
    const response = await fetch(personalContactsUrl, requestOptions);
    return await response.json();
  };

  useEffect(() => {
    loadUrl();
  }, []);

  const loadUrl = async () => {
    var big_str = '';
    const response = await getPersonalContacts();

    var acc_id_str = loginDataObject.account_id.toString();
    setFriendListUngrouped(
      Object.byString(
        response,
        'data.' + acc_id_str + '.private.grouped_contacts.ungrouped'
      )
    );
    setFrinedListGrouped(
      Object.byString(
        response,
        'data.' + acc_id_str + '.private.grouped_contacts.groups'
      )
    );
    setFrinedList({
      ungrouped: friendListUngrouped,
      groups: friendListGrouped,
    });
    // friendListGrouped.map((id) => (big_str += id));
    console.log(friendList);
  };
  const Item = ({ nickname, account_id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{account_id}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.account_id} />;
  return (
    <SafeAreaView>
      {friendList ? (
        test.map((test, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{test.id}</Text>
          </View>
        ))
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PlayersList;
