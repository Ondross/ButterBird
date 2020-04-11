import React, { useState, useEffect, useRef } from 'react';
import ShopIcon from "../ShopIcon"
import BuildingInterior from "../BuildingInterior"
import "./Armory.css"

function Armory({update, paused}) {
  const [showArmory, setShowArmory] = useState(false)

  const updateOverworld = useRef(update)
  useEffect(() => {
    updateOverworld.current = update;
  }, [update])
  useEffect(() => {
    showArmory && updateOverworld.current('armoryShown')
  }, [showArmory, updateOverworld])

  return (
    <>
      <ShopIcon x="50%" y="7%" width="18vw" onClick={() => setShowArmory(true)} iconName="armory" />
      {showArmory && (
        <BuildingInterior paused={paused} back={() => setShowArmory(false)} >
          The armorer is not in. Be back later.
        </BuildingInterior>
      )}
    </>
  )
}

export default Armory;
