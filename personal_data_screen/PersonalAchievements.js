import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useForceUpdate from '../komponente/forceUpdate';

const requestOptions = {
  method: 'GET',
};

const PersonalAchievements = ({ loginDataObject }) => {
  const [filteredAchievements, setFilteredAchievements] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    Object.entries(response_all_ach.data).forEach(([key, ach_all]) => {
      Object.entries(
        Object.byString(response_my_ach, 'data.' + acc_id_str + '.achievements')
      ).forEach(([key2, ach_my]) => {
        if (key == key2) {
          arr_of_ach.push({
            ach: ach_all,
            num_of_ach: ach_my,
          });
        }
      });
    });
    const preparedData = arr_of_ach.map(
      ({
        ach: { name_i18n, image_big, name, options, description },
        num_of_ach,
      }) => {
        return {
          ach_name: name_i18n,
          ach_description: description,
          ach_image: image_big,
          ach_number: num_of_ach,
          ach_options: options,
          id: name,
        };
      }
    );
    setFilteredAchievements(preparedData);
    setIsLoaded(true);
  };
  const renderItem = ({ item }) => <Item item={item} />;

  const Item = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemCardNumber}>
        <Text style={styles.numberText}>{item.ach_number}</Text>
      </View>
      <View style={styles.imageView}>
        {item.ach_image ? (
          <Image
            source={{
              uri: item.ach_image,
            }}
            style={{ height: 100, width: 100 }}></Image>
        ) : (
          <Image
            source={{
              uri: item.ach_options[0].image_big,
            }}
            style={{ height: 100, width: 100 }}></Image>
        )}
      </View>
      <View style={styles.textView}>
        <Text style={styles.itemText}>{item.ach_name}</Text>
      </View>
    </View>
  );
  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.mainView}>
      <SafeAreaProvider>
        {isLoaded ? (
          <FlatList
            horizontal={false}
            data={filteredAchievements}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={3}
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2d322d',
  },
  loading: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { color: 'black' },
  itemCard: {
    maxWidth: Dimensions.get('window').width / 3 - 10,
    elevation: 5,
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3b3b3b',
  },
  itemCardNumber: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 7,
  },
  imageView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 5,
  },
  itemText: {
    color: '#858585',
    fontSize: 15,
  },
  numberText: {
    fontSize: 20,
    color: 'white',
  },
});
export default PersonalAchievements;
