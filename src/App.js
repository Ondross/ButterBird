import React, {useState} from 'react';
import './App.css';
import Underworld from './Underworld/Underworld'
import Dialogue from './Dialogue/Dialogue'

const lines = [
  "My god...",
  "I woke up again?",
  "Another day. Let's call it morning."
]

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
      <Underworld active={underWorldActive} />
      <Dialogue width={window.DEFAULTGAMEWIDTH * window.GRIDSCALE - 120} done={setUnderWorldActive} lines={lines} />
    </div>
  )
}

export default App;
