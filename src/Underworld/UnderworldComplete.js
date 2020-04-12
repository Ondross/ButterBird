import React, {useEffect} from 'react';
import './UnderworldComplete.css';


function UnderworldComplete(props) {
  useEffect(() => {
    const keydown = (e) => {
      if (!props.paused && props.show && (e.key === ' ' || e.key === 'Escape')) {
        props.finish()
      }
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [props])

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
