import React from 'react';
import { StyleSheet } from 'react-native';
export const personalDataStyle = StyleSheet.create({
  sammaryView: { backgroundColor: '#2d322d', flex: 1 },
  topTextView: { flex: 1, flexDirection: 'row' },
  bottomTextView: { flex: 1, flexDirection: 'row' },
  topLeftTextView: {
    marginTop: 50,
    margin: 10,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  topRightTextView: {
    margin: 10,
    marginTop: 50,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  bottomLeftTextView: {
    margin: 10,
    marginTop: 30,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  bottomCenterTextView: {
    margin: 10,
    marginTop: 30,
    flex: 1.1,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomRightTextView: {
    margin: 10,
    marginTop: 30,
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
  headerText: {
    color: '#5c5c5c',
    fontSize: 15,
    textAlign: 'center',
  },
  clanView: {
    flex: 0.3,
    flexDirection: 'row',
  },
  clanPaper: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    flex: 0.3,
    elevation: 5,
    shadowRadius: 5,
    backgroundColor: '#3b3b3b',
    borderRadius: 10,
  },
  clanEmblemView: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
  },
  clanTagNameView: {
    flex: 0.8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clanCreatedAtView: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
  clanContainer: { flex: 1, flexDirection: 'row' },
  clanNameText: { color: 'white' },
  clanMembersCountText: { color: '#5c5c5c', fontSize: 12 },
  privateDataPaper: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    flex: 0.3,
    elevation: 5,
    shadowRadius: 5,
    backgroundColor: '#3b3b3b',
    borderRadius: 10,
  },
  privateDataView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privateDataText: { color: 'white', fontSize: 18 },
  privateDataGoldText: { color: '#ffd700', fontSize: 18 },
  emblemView: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievView: { flex: 1, flexDirection: 'row', width: '100%', margin: 20 },
  statsView: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    elevation: 5,
    shadowRadius: 5,
    backgroundColor: '#3b3b3b',
    borderRadius: 10,
  },
  nicknameText: { fontSize: 22, color: 'white' },
  nicknameView: {
    flex: 1,
    marginLeft: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomBottomTextView: {
    flex: 0.3,
    marginBottom: 10,
    flexDirection: 'row',
  },
  lastBattleTextView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginLeft: 10,
  },
  timeInBattlefiled: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  createdAt: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  headerView: { flex: 0.1, flexDirection: 'row', backgroundColor: '#3b3b3b' },
  signOutView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
});
