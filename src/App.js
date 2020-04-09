import React, {useState} from 'react';
import './App.css';
import Underworld from './Underworld/Underworld'
import Dialogue from './Dialogue/Dialogue'



window.CANVASWIDTH = 50
window.CANVASHEIGHT = 18
window.DEFAULTGAMEWIDTH = 32
window.FPS = 45
// pixels per grid square
window.GRIDSCALE = 32

function App() {
  const [underWorldActive, setUnderWorldActive] = useState(false)
  return (
    <div className="App">
      <Underworld active={underWorldActive} paused={!underWorldActive} />
      <Dialogue
        width={window.DEFAULTGAMEWIDTH * window.GRIDSCALE - 120}
        done={setUnderWorldActive}
        level={1}
        scene="Intro"
      />
    </div>
  )
}

export default App;
