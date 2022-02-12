import React from 'react';
import PlayersList from './PlayersList';

const LogedInScreenPlayers = ({ loginDataObject }) => {
  return (
    <>
      <PlayersList loginDataObject={loginDataObject} />
    </>
  );
};

export default LogedInScreenPlayers;
