import React from 'react';


function Overworld(props) {
  if (!props.show) {
    return (null)
  }
  return (
    <div className="underworld-container">
      Overworld
    </div>
  )
}

export default Overworld;
