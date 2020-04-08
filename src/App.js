import React from 'react';
import './App.css';
import Underworld from './Underworld/Underworld'

window.CANVASWIDTH = 50
window.CANVASHEIGHT = 18
window.FPS = 45
// pixels per grid square
window.GRIDSCALE = 32

function App() {

  return (
    <div className="App">
      <Underworld />
    </div>
  )
}

export default App;
