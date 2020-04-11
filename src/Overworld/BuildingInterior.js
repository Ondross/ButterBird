import React, {useEffect} from 'react';
import "./BuildingInterior.css"

function BuildingInterior(props) {
  useEffect(() => {
    const keydown = (e) => {
      console.log("GOT IT", e.key)
      if (e.key === 'Escape') {
        props.back()
      }
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [props])

  return (
    <div className="container">
      {props.children}
      <div className="back-button" onClick={props.back}>
        <span role="img">◀</span>️
      </div>
    </div>
  )
}

export default BuildingInterior;
