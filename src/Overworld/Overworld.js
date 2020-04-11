import React, { useEffect } from 'react';
import './Overworld.css'
import Armory from './Armory/Armory'
import Shelter from './Shelter/Shelter'
import Cave from './Cave/Cave'

function Overworld(props) {

  // call this everytime we take an action, ie, click on a shop
  useEffect(() => props.level.update(props.playScene))

  const update = info => props.level.update(props.playScene, info)

  return (
    <div className="overworld-container">
      <img alt="overworld" src={props.level.backgroundSrc} className="overworld-background" />
      {props.level.shops.armory && <Armory paused={props.paused} update={update} />}
      {props.level.shops.shelter && <Shelter paused={props.paused} config={props.level.shops.shelter} update={update} />}
      {props.level.shops.cave && <Cave paused={props.paused} config={props.level.shops.cave} update={update} setLevel={props.setLevel} />}
    </div>
  )
}

export default Overworld;
