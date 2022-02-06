import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import useForceUpdate from '../komponente/forceUpdate';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const requestOptions = {
  method: 'GET',
};

const PlayersSearch = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState(null);
  const [isSearchTrue, setIsSearchTrue] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLading] = useState(false);
  const forceUpdate = useForceUpdate();

  const getSearched = async (nickname) => {
    const response = await fetch(
      'https://api.worldoftanks.eu/wot/account/list/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&search=' +
        nickname +
        '&type=startswith&limit=15',
      requestOptions
    );
    return await response.json();
  };

  const loadUrl = async (search) => {
    if (!isLoading) setIsSearchTrue(false);
    setIsLading(true);
    const response = await getSearched(search);
    setSearchList(response);
    setIsLading(false);
    console.log(response);
    if (response.meta.count >= 1) setIsSearchTrue(true);
    else setIsSearchTrue(false);
    // forceUpdate();
  };

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
  const handleOnTextChange = (value) => {
    setSearch(value);
    if (value.trim().length >= 3 && value.trim().length <= 24) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.searchView}>
        <View style={styles.search}>
          <KeyboardAvoidingView
            behavior='position'
            style={styles.contentZIndex}>
            <TextInput
              style={styles.input}
              onChangeText={handleOnTextChange}
              value={search}
              placeholder='Player nickname...'
              placeholderTextColor='white'
              textContentType='nickname'
            />
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity
          disabled={search.length >= 3 && search.length <= 24 ? false : true}
          style={styles.searchBtn}
          onPress={() => loadUrl(search)}>
          {isDisabled ? (
            <Feather name='search' size={24} color='#5c5c5c' />
          ) : (
            <Feather name='search' size={24} color='white' />
          )}
        </TouchableOpacity>
      </View>
      {isSearchTrue ? (
        <SafeAreaProvider>
          <ScrollView>
            {searchList.data.map((player) => (
              <TouchableOpacity
                key={player.account_id}
                onPress={() =>
                  navigation.navigate('Player', {
                    account_id: player.account_id,
                  })
                }>
                <View style={styles.itemView}>
                  <Text style={styles.playerNicknameText}>
                    {player.nickname}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaProvider>
      ) : (
        <></>
      )}
      {isLoading ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PlayersSearch;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#2d322d',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    flexDirection: 'column',
    paddingTop: StatusBar.currentHeight,
  },
  searchView: {
    flex: 0.15,
    flexDirection: 'row',
    top: 0,
    margin: 10,
    zIndex: 3,
  },
  search: { flex: 0.9, flexDirection: 'column', justifyContent: 'center' },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#5c5c5c',
    padding: 10,
    margin: 10,
    color: 'white',
  },
  searchBtn: {
    flex: 0.1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentZIndex: { zIndex: 0 },
  itemView: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  playerNicknameText: {
    fontSize: 18,
    color: 'white',
  },
  loading: { color: 'white' },
});
