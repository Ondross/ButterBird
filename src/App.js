import React, {useState} from 'react';
import './App.css';
import Underworld from './Underworld/Underworld'
import Dialogue from './Dialogue/Dialogue'
import Level1 from './Levels/Underworld/1'



window.CANVASWIDTH = 50
window.CANVASHEIGHT = 18
window.DEFAULTGAMEWIDTH = 32
window.FPS = 45
// pixels per grid square
window.GRIDSCALE = 32

const level = new Level1()
function App() {
  const [underWorldActive, setUnderWorldActive] = useState(false)

  const setUnderworldState = (state) => {
    const command = level.update(state)
    if (command.playScene) {
      setGameState((state) => {
        return {...state, scene: command.playScene}
      })
    }
  }
  const [gameState, setGameState] = useState({})

  return (
    <div className="App">
      <Underworld active={underWorldActive} paused={!underWorldActive} setGameState={setUnderworldState} />
      <Dialogue
        width={window.DEFAULTGAMEWIDTH * window.GRIDSCALE - 120}
        done={setUnderWorldActive}
        level="Underworld1"
        scene={gameState.scene}
      />
    </div>
  )
}

export default App;
