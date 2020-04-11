import React, { useState } from 'react';
import ShopIcon from "./ShopIcon"
import BuildingInterior from "./BuildingInterior"

function Shelter(props) {
  const [showShelter, setShowShelter] = useState(false)
  return (
    <>
      <ShopIcon x="10%" y="40%" onClick={() => setShowShelter(true)} iconName="shelter" />
      {showShelter && (
        <BuildingInterior back={() => setShowShelter(false)} >
          (Under Construction) Cool. This will be a good place to sleep later on.
        </BuildingInterior>
      )}
    </>
  )
}

export default Shelter;
