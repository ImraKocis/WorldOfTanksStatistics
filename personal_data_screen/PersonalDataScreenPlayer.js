import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import useForceUpdate from '../komponente/forceUpdate';
import numbro from 'numbro';
import { personalDataStyle } from './personalDataStyle';
const styles = personalDataStyle;
const requestOptions = {
  method: 'GET',
};

const PersonalDataScreenPlayer = ({ route }) => {
  const playerDataUrl =
    'https://api.worldoftanks.eu/wot/account/info/?account_id=' +
    route.params.account_id.toString() +
    '&application_id=3b94e8ffc3a72fc5fcbc1477907b386f';
  const [isLoaded, setIsLoaded] = useState(false);
  const [playerObject, setPlayerObject] = useState(null);
  const [playersClanObject, setPlayersClanObject] = useState(null);
  const [isInClan, setIsInClan] = useState(false);
  const [playerDataIds, setPlayerDataIds] = useState(null);
  const [aditionalData, setAditionalData] = useState(null);
  const [aditionalClanData, setAditionalClanData] = useState(null);
  const forceUpdate = useForceUpdate();

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

  const getPlayerData = async () => {
    const response = await fetch(playerDataUrl, requestOptions);
    return await response.json();
  };

  const getPlayersClanData = async (clan_id) => {
    const responseClan = await fetch(
      'https://api.worldoftanks.eu/wot/clans/info/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&clan_id=' +
        clan_id.toString(),
      requestOptions
    );
    return await responseClan.json();
  };

  useEffect(() => {
    loadUrl();
  }, []);

  const loadUrl = async () => {
    const player_response = await getPlayerData();
    setPlayerObject(player_response);
    var acc_id_str = route.params.account_id.toString();

    var player_clan_id = Object.byString(
      player_response,
      'data.' + acc_id_str + '.clan_id'
    );

    //console.log('clan id:' + player_clan_id);
    //rijesit logiku s clan_id i pozivom ako je null
    if (player_clan_id !== null) {
      var clan_id_str = player_clan_id.toString();
      const clan_response = await getPlayersClanData(player_clan_id);
      setPlayersClanObject(clan_response);
      //console.log(clan_response);
      setIsInClan(true);
      var clan_created_at = new Date(
        Object.byString(clan_response, 'data.' + clan_id_str + '.created_at') *
          1000
      );
      setAditionalClanData({ clan_created_at: clan_created_at });
    } else {
      setIsInClan(false);
    }

    var player_acc_created_at = new Date(
      Object.byString(player_response, 'data.' + acc_id_str + '.created_at') *
        1000
    );
    var player_last_battle_at = new Date(
      Object.byString(
        player_response,
        'data.' + acc_id_str + '.last_battle_time'
      ) * 1000
    );

    var battles = Object.byString(
      player_response,
      'data.' + acc_id_str + '.statistics.all.battles'
    );
    var wins = Object.byString(
      player_response,
      'data.' + acc_id_str + '.statistics.all.wins'
    );
    var wins_in_percent = (wins / battles) * 100;
    var damage_dealt = Object.byString(
      player_response,
      'data.' + acc_id_str + '.statistics.all.damage_dealt'
    );
    var avg_damage_dealt = damage_dealt / battles;

    setAditionalData({
      player_acc_created_at: player_acc_created_at,
      player_last_battle_at: player_last_battle_at,
      wins_in_percent: wins_in_percent,
      avg_damage_dealt: avg_damage_dealt,
    });

    setPlayerDataIds({
      player_clan_id: player_clan_id,
      acc_id_str: acc_id_str,
    });
    //console.log('data: ' + aditionalData);
    setIsLoaded(true);
    forceUpdate();
  };

  //console.log(route.params.account_id);
  return (
    <SafeAreaProvider>
      {isLoaded ? (
        <View style={styles.sammaryView}>
          <View style={styles.statsViewPlayer}>
            <View style={styles.topTextView}>
              <View style={styles.topLeftTextView}>
                <Text style={styles.headerText}>Battles</Text>
                <Text style={styles.statsText}>
                  {numbro(
                    Object.byString(
                      playerObject,
                      'data.' +
                        playerDataIds.acc_id_str +
                        '.statistics.all.battles'
                    )
                  ).format({
                    thousandSeparated: true,
                  })}
                </Text>
              </View>

              <View style={styles.emblemView}>
                <Image source={require('../img/wotbaner.png')}></Image>
              </View>
              <View style={styles.topRightTextView}>
                <Text style={styles.headerText}>Victories</Text>
                <Text style={styles.statsText}>
                  {numbro(aditionalData.wins_in_percent).format({
                    mantissa: 2,
                  }) + '%'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.25,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 25 }}>
                {Object.byString(
                  playerObject,
                  'data.' + playerDataIds.acc_id_str + '.nickname'
                )}
              </Text>
            </View>
            <View style={styles.bottomTextView}>
              <View style={styles.bottomLeftTextView}>
                <Text style={styles.headerText}>Avg Damage</Text>
                <Text style={styles.statsText}>
                  {numbro(aditionalData.avg_damage_dealt).format({
                    thousandSeparated: true,
                    mantissa: 0,
                  })}
                </Text>
              </View>
              <View style={styles.bottomCenterTextView}>
                <Text style={styles.headerText}>Personal Rating</Text>
                <Text style={styles.statsText}>
                  {numbro(
                    Object.byString(
                      playerObject,
                      'data.' + playerDataIds.acc_id_str + '.global_rating'
                    )
                  ).format({ thousandSeparated: true })}
                </Text>
              </View>
              <View style={styles.bottomRightTextView}>
                <Text style={styles.headerText}>Avg XP</Text>
                <Text style={styles.statsText}>
                  {numbro(
                    Object.byString(
                      playerObject,
                      'data.' +
                        playerDataIds.acc_id_str +
                        '.statistics.all.battle_avg_xp'
                    )
                  ).format({ thousandSeparated: true })}
                </Text>
              </View>
            </View>
            <View style={styles.bottomBottomTextView}>
              <View style={styles.lastBattleTextView}>
                <Text style={styles.headerText}>Last Battle:</Text>
                <Text style={styles.headerText}>
                  {aditionalData.player_last_battle_at.getDate() +
                    '.' +
                    (aditionalData.player_last_battle_at.getMonth() + 1) +
                    '.' +
                    aditionalData.player_last_battle_at.getFullYear() +
                    '.'}
                </Text>
              </View>
              <View style={styles.createdAt}>
                <Text style={styles.headerText}>Account created:</Text>
                <Text style={styles.headerText}>
                  {aditionalData.player_acc_created_at.getDate() +
                    '.' +
                    (aditionalData.player_acc_created_at.getMonth() + 1) +
                    '.' +
                    aditionalData.player_acc_created_at.getFullYear() +
                    '.'}
                </Text>
              </View>
            </View>
          </View>
          {isInClan ? (
            <View style={styles.clanPaper}>
              <View style={styles.clanContainer}>
                <View style={styles.clanEmblemView}>
                  <Image
                    source={{
                      uri: Object.byString(
                        playersClanObject,
                        'data.' +
                          playerDataIds.player_clan_id +
                          '.emblems.x64.wot'
                      ),
                    }}
                    style={{ height: 64, width: 64 }}></Image>
                </View>
                <View style={styles.clanTagNameView}>
                  <Text
                    style={{
                      color: Object.byString(
                        playersClanObject,
                        'data.' + playerDataIds.player_clan_id + '.color'
                      ),
                      fontSize: 25,
                    }}>
                    {'['}
                    {Object.byString(
                      playersClanObject,
                      'data.' + playerDataIds.player_clan_id + '.tag'
                    )}
                    {']'}
                  </Text>
                  <Text style={styles.clanNameText}>
                    {Object.byString(
                      playersClanObject,
                      'data.' + playerDataIds.player_clan_id + '.name'
                    )}
                  </Text>
                  <Text style={styles.clanMembersCountText}>
                    {'Members ' +
                      Object.byString(
                        playersClanObject,
                        'data.' +
                          playerDataIds.player_clan_id +
                          '.members_count'
                      )}
                  </Text>
                </View>
                <View style={styles.clanCreatedAtView}>
                  <Text style={styles.headerText}>Clan created:</Text>
                  <Text style={styles.headerText}>
                    {aditionalClanData.clan_created_at.getDate() +
                      '.' +
                      (aditionalClanData.clan_created_at.getMonth() + 1) +
                      '.' +
                      aditionalClanData.clan_created_at.getFullYear() +
                      '.'}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={{ flex: 0.2 }}></View>
          )}
          <View style={{ flex: 0.2 }}></View>
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

export default PersonalDataScreenPlayer;
