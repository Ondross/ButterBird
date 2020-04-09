import React from 'react';


function UnderworldComplete(props) {
  if (!props.show) {
    return (null)
  }
  return (
    <div className="underworld-complete" onClick={props.finish}>
      Done!
    </div>
  )
}

export default UnderworldComplete;
