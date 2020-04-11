import React, { useEffect } from 'react';
import './Overworld.css'
import Armory from './Armory'
import Barracks from './Barracks'
import Cave from './Cave'

function Overworld(props) {

  // call this everytime we take an action, ie, click on a shop
  // this lets us command other 
  useEffect(() => props.level.update(props.playScene))

  return (
    <div className="overworld-container">
      <img alt="overworld" src={props.level.backgroundSrc} className="overworld-background" />
      {props.level.shops.armory && <Armory />}
      {props.level.shops.barracks && <Barracks />}
      {props.level.shops.cave && <Cave />}
    </div>
  )
}

export default Overworld;
