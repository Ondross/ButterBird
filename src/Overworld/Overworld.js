import React, { useEffect } from 'react';
import './Overworld.css'
import Armory from './Armory'
import Barracks from './Barracks'

function Overworld(props) {

  // call this everytime we take an action, ie, click on a shop
  useEffect(props.setGameState)

  return (
    <div className="overworld-container">
      Overworld
      <img alt="overworld" src={props.level.backgroundSrc} className="overworld-background" />
      {props.level.shops.armory && <Armory />}
      {props.level.shops.barracks && <Barracks />}
    </div>
  )
}

export default Overworld;
