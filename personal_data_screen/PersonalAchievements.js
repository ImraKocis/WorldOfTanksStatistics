import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useForceUpdate from '../komponente/forceUpdate';

const requestOptions = {
  method: 'GET',
};

const PersonalAchievements = ({ loginDataObject }) => {
  const [achievementsObject, setAchievementsObject] = useState(null);
  const [allAchievements, setAllAchievements] = useState(null);
  const [filteredAchievements, setFilteredAchievements] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [aditionalData, setAditionalData] = useState(null);
  const forceUpdate = useForceUpdate();
  const url_all_ach =
    'https://api.worldoftanks.eu/wot/encyclopedia/achievements/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f';
  const url_player_ach =
    'https://api.worldoftanks.eu/wot/account/achievements/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&account_id=' +
    loginDataObject.account_id;
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
  const getAchievements = async () => {
    const response = await fetch(url_player_ach, requestOptions);
    return await response.json();
  };
  const getAllAchievements = async () => {
    const response = await fetch(url_all_ach, requestOptions);
    return await response.json();
  };
  useEffect(() => {
    loadUrl();
  }, []);
  const loadUrl = async () => {
    const response_my_ach = await getAchievements();
    const response_all_ach = await getAllAchievements();
    var acc_id_str = loginDataObject.account_id.toString();
    var arr_of_ach = [];
    setAchievementsObject(response_my_ach);
    setAllAchievements(response_all_ach);
    Object.entries(response_all_ach.data).forEach(([key, ach_all]) => {
      Object.entries(
        Object.byString(response_my_ach, 'data.' + acc_id_str + '.achievements')
      ).forEach(([key2, ach_my]) => {
        if (key == key2) {
          arr_of_ach.push({
            ach: ach_all,
            num_of_ach: ach_my,
          });
          //console.log('all_ach_key: ' + key + ' == ' + key2 + ' :my_ach_key');
        }
      });
    });
    const preparedData = arr_of_ach.map(
      ({ ach: { name_i18n, image_big, name }, num_of_ach }) => {
        return {
          ach_name: name_i18n,
          ach_image: image_big,
          ach_number: num_of_ach,
          id: name,
        };
      }
    );
    setFilteredAchievements(preparedData);
    console.log(filteredAchievements);
    setIsLoaded(true);
  };
  const renderItem = ({ item }) => <Item item={item} />;
  const Item = ({ item }) => (
    <View>
      <Image
        source={{
          uri: item.ach_image,
        }}
        style={{ height: 100, width: 100 }}></Image>
    </View>
  );
  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.mainView}>
      <SafeAreaProvider>
        {isLoaded ? (
          <FlatList
            data={filteredAchievements}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </SafeAreaProvider>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { color: 'black' },
});
export default PersonalAchievements;
