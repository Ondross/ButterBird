import React, { useState } from 'react';
import './ShopIcon.css'

function Armory(props) {
  const [highlightHidden, setHighlightHidden] = useState('hidden')
  const path = `/images/buildings/${props.iconName}.png`
  const highlightPath = `/images/buildings/${props.iconName}Highlight.png`
  return (
    <div className="shop-container">
      <div className="shop-icon-container" style={{bottom: props.y, right: props.x}}>
        <img
          alt=""
          className="shop-icon"
          style={{ visibility: highlightHidden }}
          src={highlightPath} />
        <img
          alt="shop"
          className="shop-icon"
          onMouseEnter={() => setHighlightHidden('initial')}
          onMouseLeave={() => setHighlightHidden('hidden')}
          src={path}
        />
      </div>
    </div>
  )
}

export default Armory;
