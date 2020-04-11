import React, { useState } from 'react';
import ShopIcon from "./ShopIcon"
import BuildingInterior from "./BuildingInterior"

function Armory(props) {
  const [showArmory, setShowArmory] = useState(false)
  return (
    <>
      <ShopIcon x="50%" y="7%" width="18vw" onClick={() => setShowArmory(true)} iconName="armory" />
      {showArmory && (
        <BuildingInterior back={() => setShowArmory(false)} >
          (Be back later) Looks like a place to buy some better weapons.
        </BuildingInterior>
      )}
    </>
  )
}

export default Armory;
