import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PersonalDataScreenPlayer from './PersonalDataScreenPlayer';
import React, { useState, useEffect } from 'react';
import useForceUpdate from '../komponente/forceUpdate';

const requestOptions = {
  method: 'GET',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d322d',
    marginTop: StatusBar.currentHeight || 0,
  },
  itemView: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  itemRightView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLeftView: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  playerNicknameView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  playerLastBattleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  playerWinPercentView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  playerNumOfBattlesView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  playerWinPercentText: { fontSize: 19, color: 'white' },
  playerNumOfBattlesText: {
    color: '#5c5c5c',
    fontSize: 15,
    textAlign: 'right',
  },
  playerLastBattleText: {
    color: '#5c5c5c',
    fontSize: 15,
    textAlign: 'left',
  },
  playerNicknameText: {
    fontSize: 20,
    color: 'white',
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

  // const [friendListUngrouped, setFriendListUngrouped] = useState(null); //arr id-a from data.private.ungruped
  // const [friendListGrouped, setFrinedListGrouped] = useState(null); // friends from groups
  const [friendList, setFrinedList] = useState(null); // all from frined list
  const [isLoaded, setIsLoaded] = useState(false);
  const forceUpdate = useForceUpdate();

  const test = [
    { id: 1, name: 'jedan' },
    { id: 2, name: 'dva' },
  ];
  const getPersonalContacts = async () => {
    const response = await fetch(personalContactsUrl, requestOptions);
    return await response.json();
  };

  const getAllContactsData = async (ids) => {
    const response = await fetch(
      'https://api.worldoftanks.eu/wot/account/info/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&account_id=' +
        ids,
      requestOptions
    );
    return await response.json();
  };

  useEffect(() => {
    loadUrl();
  }, []);

  const loadUrl = async () => {
    var big_str = '';
    const response = await getPersonalContacts();
    let myArray = [];
    var groupKey;
    var acc_id_str = loginDataObject.account_id.toString();
    // setFriendListUngrouped(
    //   Object.byString(
    //     response,
    //     'data.' + acc_id_str + '.private.grouped_contacts.ungrouped'
    //   )
    // );
    // setFrinedListGrouped(
    //   Object.byString(
    //     response,
    //     'data.' + acc_id_str + '.private.grouped_contacts.groups'
    //   )
    // );
    myArray.push(
      ...Object.byString(
        response,
        'data.' + acc_id_str + '.private.grouped_contacts.ungrouped'
      )
    );
    groupKey = Object.keys(
      Object.byString(
        response,
        'data.' + acc_id_str + '.private.grouped_contacts.groups'
      )
    );
    groupKey.forEach((key) => {
      myArray.push(
        ...Object.byString(
          response,
          'data.' +
            acc_id_str +
            '.private.grouped_contacts.groups.' +
            key.toString()
        )
      );
    });
    myArray.forEach((id, index) => {
      if (index == 0) big_str += id;
      else big_str += ',' + id;
    });
    const main_response = await getAllContactsData(big_str);
    setFrinedList(main_response);
    //console.log(friendList);
    setIsLoaded(true);
    forceUpdate();
  };
  const Item = ({ nickname, account_id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{nickname}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item account_id={item.account_id} nickname={item.nickname} />
  );
  return (
    <SafeAreaProvider style={styles.container}>
      {isLoaded ? (
        <FlatList
          data={Object.keys(friendList.data)}
          renderItem={({ item }) => (
            <View style={styles.itemView}>
              <View style={styles.itemLeftView}>
                <View style={styles.playerNicknameView}>
                  <Text style={styles.playerNicknameText}>
                    {friendList.data[item].nickname}
                  </Text>
                </View>
                <View style={styles.playerLastBattleView}>
                  <Text style={styles.playerLastBattleText}>
                    {/* {friendList.data[item].nickname} */}
                    last battle
                  </Text>
                </View>
              </View>
              <View style={styles.itemRightView}>
                <View style={styles.playerWinPercentView}>
                  <Text style={styles.playerWinPercentText}>
                    {/* {friendList.data[item].nickname} */}
                    50.5%
                  </Text>
                </View>
                <View style={styles.playerNumOfBattlesView}>
                  <Text style={styles.playerNumOfBattlesText}>
                    {/* {friendList.data[item].nickname} */}53,465
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => friendList.data[item].account_id}
        />
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

export default PlayersList;