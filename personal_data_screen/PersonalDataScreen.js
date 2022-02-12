import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { personalDataStyle } from './personalDataStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useForceUpdate from '../komponente/forceUpdate';
import numbro from 'numbro';

const styles = personalDataStyle;
const requestOptions = {
  method: 'GET',
};
const PersonalDataScreen = ({ loginDataObject }) => {
  const [personalDataObject, setPersonalDataObject] = useState(null);
  const [personalClanDataObject, setPersonalClanDataObject] = useState(null);
  const [aditionalData, setAditionalData] = useState(null);
  const [createdAtObject, setCreatedAtObject] = useState(null);
  const [personalDataIds, setPersonaldataIds] = useState(null);
  const [isInClan, setIsInClan] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const forceUpdate = useForceUpdate();

  const personalDataUrl =
    'https://api.worldoftanks.eu/wot/account/info/?account_id=' +
    loginDataObject.account_id +
    '&application_id=3b94e8ffc3a72fc5fcbc1477907b386f&access_token=' +
    loginDataObject.access_token +
    '&extra=statistics.random%2C+statistics.ranked_10x10';

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
  function secondsToHours(s) {
    s = Number(s);
    var h = Math.floor(s / 3600);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
    return hDisplay.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  const getPersonalData = async () => {
    const response = await fetch(personalDataUrl, requestOptions);
    return await response.json();
  };
  const getPersonalClanData = async (clanId) => {
    const clanResponse = await fetch(
      'https://api.worldoftanks.eu/wot/clans/info/?application_id=3b94e8ffc3a72fc5fcbc1477907b386f&clan_id=' +
        clanId,
      requestOptions
    );
    return await clanResponse.json();
  };
  useEffect(() => {
    loadUrl();
  }, []);

  const loadUrl = async () => {
    const response = await getPersonalData();
    setPersonalDataObject(response);
    var acc_id_str = loginDataObject.account_id.toString();
    var clan_id_str = Object.byString(
      response,
      'data.' + acc_id_str + '.clan_id'
    );
    var battles = Object.byString(
      response,
      'data.' + acc_id_str + '.statistics.all.battles'
    );
    var wins = Object.byString(
      response,
      'data.' + acc_id_str + '.statistics.all.wins'
    );
    var wins_in_percent = (wins / battles) * 100;
    var damage_dealt = Object.byString(
      response,
      'data.' + acc_id_str + '.statistics.all.damage_dealt'
    );
    var avg_damage_dealt = damage_dealt / battles;
    var acc_created_timestamp = Object.byString(
      response,
      'data.' + acc_id_str + '.created_at'
    );
    var acc_last_battle_timestpam = Object.byString(
      response,
      'data.' + acc_id_str + '.last_battle_time'
    );
    var timeInBattleInSec = Object.byString(
      response,
      'data.' + acc_id_str + '.private.battle_life_time'
    );
    if (clan_id_str !== null) {
      var clan_id_actual_string = clan_id_str.toString();
      const clanResponse = await getPersonalClanData(clan_id_actual_string);
      setPersonalClanDataObject(clanResponse);
      var clan_created_at_timestamp = Object.byString(
        clanResponse,
        'data.' + clan_id_actual_string + '.created_at'
      );

      var clan_date = new Date(clan_created_at_timestamp * 1000);
      setCreatedAtObject({ clan_date: clan_date });
      setIsInClan(true);
    } else {
      setIsInClan(false);
    }

    var acc_created_at = new Date(acc_created_timestamp * 1000);
    var acc_time_in_battle = secondsToHours(timeInBattleInSec);
    var acc_last_battle_time = new Date(acc_last_battle_timestpam * 1000);

    setPersonaldataIds({ acc_id_str: acc_id_str, clan_id_str: clan_id_str });

    setAditionalData({
      wins_in_percent: wins_in_percent,
      avg_damage_dealt: avg_damage_dealt,
      acc_created_at: acc_created_at,
      acc_last_battle_time: acc_last_battle_time,
      acc_time_in_battle: acc_time_in_battle,
    });
    setIsLoaded(true);
    forceUpdate();
  };

  return (
    <SafeAreaProvider>
      <StatusBar hidden></StatusBar>
      {isLoaded ? (
        <View style={styles.sammaryView}>
          <View style={styles.statsView}>
            <View style={styles.topTextView}>
              <View style={styles.topLeftTextView}>
                <Text style={styles.headerText}>Battles</Text>
                <Text style={styles.statsText}>
                  {numbro(
                    Object.byString(
                      personalDataObject,
                      'data.' +
                        personalDataIds.acc_id_str +
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
                    thousandSeparated: true,
                    mantissa: 2,
                  }) + '%'}
                </Text>
              </View>
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
                      personalDataObject,
                      'data.' + personalDataIds.acc_id_str + '.global_rating'
                    )
                  ).format({ thousandSeparated: true })}
                </Text>
              </View>
              <View style={styles.bottomRightTextView}>
                <Text style={styles.headerText}>Avg XP</Text>
                <Text style={styles.statsText}>
                  {numbro(
                    Object.byString(
                      personalDataObject,
                      'data.' +
                        personalDataIds.acc_id_str +
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
                  {aditionalData.acc_last_battle_time.getDate() +
                    '.' +
                    (aditionalData.acc_last_battle_time.getMonth() + 1) +
                    '.' +
                    aditionalData.acc_last_battle_time.getFullYear() +
                    '.'}
                </Text>
              </View>
              <View style={styles.timeInBattlefiled}>
                <Text style={styles.headerText}>Time in game:</Text>
                <Text style={styles.headerText}>
                  {aditionalData.acc_time_in_battle}
                </Text>
              </View>
              <View style={styles.createdAt}>
                <Text style={styles.headerText}>Account created:</Text>
                <Text style={styles.headerText}>
                  {aditionalData.acc_created_at.getDate() +
                    '.' +
                    (aditionalData.acc_created_at.getMonth() + 1) +
                    '.' +
                    aditionalData.acc_created_at.getFullYear() +
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
                        personalClanDataObject,
                        'data.' +
                          personalDataIds.clan_id_str +
                          '.emblems.x64.wot'
                      ),
                    }}
                    style={{ height: 64, width: 64 }}></Image>
                </View>
                <View style={styles.clanTagNameView}>
                  <Text
                    style={{
                      color: Object.byString(
                        personalClanDataObject,
                        'data.' + personalDataIds.clan_id_str + '.color'
                      ),
                      fontSize: 25,
                    }}>
                    {'['}
                    {Object.byString(
                      personalClanDataObject,
                      'data.' + personalDataIds.clan_id_str + '.tag'
                    )}
                    {']'}
                  </Text>
                  <Text style={styles.clanNameText}>
                    {Object.byString(
                      personalClanDataObject,
                      'data.' + personalDataIds.clan_id_str + '.name'
                    )}
                  </Text>
                  <Text style={styles.clanMembersCountText}>
                    {'Members ' +
                      Object.byString(
                        personalClanDataObject,
                        'data.' + personalDataIds.clan_id_str + '.members_count'
                      )}
                  </Text>
                </View>
                <View style={styles.clanCreatedAtView}>
                  <Text style={styles.headerText}>Clan created:</Text>
                  <Text style={styles.headerText}>
                    {createdAtObject.clan_date.getDate() +
                      '.' +
                      (createdAtObject.clan_date.getMonth() + 1) +
                      '.' +
                      createdAtObject.clan_date.getFullYear() +
                      '.'}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={{ marginTop: 10 }}></View>
          )}

          <View style={styles.privateDataPaper}>
            <View style={styles.privateDataView}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.privateDataText}>Gold: </Text>
                <Text style={styles.privateDataGoldText}>
                  {numbro(
                    Object.byString(
                      personalDataObject,
                      'data.' + personalDataIds.acc_id_str + '.private.gold'
                    )
                  ).format({ thousandSeparated: true })}
                </Text>
              </View>
            </View>
            <View style={styles.privateDataView}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.privateDataText}>Credits: </Text>
                <Text style={styles.privateDataText}>
                  {numbro(
                    Object.byString(
                      personalDataObject,
                      'data.' + personalDataIds.acc_id_str + '.private.credits'
                    )
                  ).format({ thousandSeparated: true })}
                </Text>
              </View>
            </View>
            <View style={styles.privateDataView}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.privateDataText}>Free Experience: </Text>
                <Text style={styles.privateDataText}>
                  {numbro(
                    Object.byString(
                      personalDataObject,
                      'data.' + personalDataIds.acc_id_str + '.private.free_xp'
                    )
                  ).format({ thousandSeparated: true })}
                </Text>
              </View>
            </View>
            <View style={styles.privateDataView}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.privateDataText}>Bonds: </Text>
                <Text style={styles.privateDataText}>
                  {numbro(
                    Object.byString(
                      personalDataObject,
                      'data.' + personalDataIds.acc_id_str + '.private.bonds'
                    )
                  ).format({ thousandSeparated: true })}
                </Text>
              </View>
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
