import React, { useEffect } from 'react';
import './Overworld.css'
import Armory from './Armory'
import Shelter from './Shelter'
import Cave from './Cave/Cave'

function Overworld(props) {

  // call this everytime we take an action, ie, click on a shop
  // this lets us command other 
  useEffect(() => props.level.update(props.playScene))

  const update = info => props.level.update(props.playScene, info)

  return (
    <div className="overworld-container">
      <img alt="overworld" src={props.level.backgroundSrc} className="overworld-background" />
      {props.level.shops.armory && <Armory update={update} />}
      {props.level.shops.shelter && <Shelter config={props.level.shops.shelter} update={update} />}
      {props.level.shops.cave && <Cave config={props.level.shops.cave} update={update} setLevel={props.setLevel} />}
    </div>
  )
}

export default Overworld;
