import React, { useState, useEffect, useRef } from 'react';
import ShopIcon from "../ShopIcon"
import BuildingInterior from "../BuildingInterior"
import "./Shelter.css"

function Shelter({update, config, paused}) {
  const [showShelter, setShowShelter] = useState(false)

  // I have to do this wacky thing to prevent an infinite loop
  // when I call update. useEffect thinks that the update function is
  // changing if I don't do this.
  const updateOverworld = useRef(update)
  useEffect(() => {
    updateOverworld.current = update;
  }, [update])


  useEffect(() => {
    showShelter && updateOverworld.current('shelterShown')
  }, [showShelter, updateOverworld])

  return (
    <>
      <ShopIcon x="10%" y="40%" onClick={() => setShowShelter(true)} iconName="shelter" />
      {showShelter && (
        <BuildingInterior paused={paused} back={() => setShowShelter(false)} >
          <div className="heros-container">
            {config.party.map((hero) => (
              <div className="hero" key={hero.name || '???'} >
                <img src={hero.images.avatar[0].src} alt="avatar" className="shelter-avatar" />
                <div className="hero-stats">
                  <div className="hero-name"> {hero.name || '???'} </div>
                  <div className="hero-stat"> Health: {hero.health || '???'} </div>
                  <div className="hero-stat"> Attack: {hero.attack || '???'} </div>
                  <div className="hero-stat"> Speed: {hero.speed || '???'} </div>
                </div>
              </div>
            ))}
          </div>
        </BuildingInterior>
      )}
    </>
  )
}

export default Shelter;
