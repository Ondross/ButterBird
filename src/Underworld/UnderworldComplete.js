import React, {useEffect} from 'react';
import '../Modal.css';


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
    <div className="modal-container">
      <div className="modal" onClick={props.finish}>
        Congratulations!
        <div className="modal-button">next level</div>
      </div>   
    </div>
  )
}

export default UnderworldComplete;
