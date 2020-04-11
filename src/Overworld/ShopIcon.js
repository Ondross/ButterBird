import React, { useState } from 'react';
import './ShopIcon.css'

function ShopIcon(props) {
  const [highlightHidden, setHighlightHidden] = useState('hidden')
  const path = `/images/buildings/${props.iconName}.png`
  const highlightPath = `/images/buildings/${props.iconName}Highlight.png`
  return (
    <div className="shop-container">
      <div onClick={props.onClick} className="shop-icon-container" style={{bottom: props.y, right: props.x, width: props.width || '12vw'}}>
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

export default ShopIcon;
