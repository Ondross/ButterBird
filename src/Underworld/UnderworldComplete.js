import React from 'react';
import './UnderworldComplete.css';


function UnderworldComplete(props) {
  if (!props.show) {
    return (null)
  }
  return (
    <div className="underworld-complete-container">
      <div className="underworld-complete" onClick={props.finish}>
        Congratulations!
        <div className="done-button">next level</div>
      </div>   
    </div>
  )
}

export default UnderworldComplete;
