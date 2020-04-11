import React, {useState, useEffect} from 'react';
import ShopIcon from "../ShopIcon"
import BuildingInterior from "../BuildingInterior"
import "./Cave.css"

function Cave(props) {
  const [showCave, setShowCave] = useState(false)

  useEffect(() => {
    showCave && props.update('caveShown')
  }, [props, showCave])

  return (
    <>
      <ShopIcon x="43%" y="38%" onClick={() => setShowCave(true)} iconName="cave" />
      {showCave && (
        <BuildingInterior back={() => setShowCave(false)}>
          <div className="levels-container">
            {props.config.levels.map(level => (
              <div className={`level-entrance ${level.completed && "completed"}`} key={level.name} onClick={() => props.setLevel(level) } >
                {level.name}
                {level.completed && <div className="completed-tag">complete</div>}
              </div>
            ))}
          </div>
        </BuildingInterior>
      )}
    </>
  )
}

export default Cave;
