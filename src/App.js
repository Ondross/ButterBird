import React, {useState} from 'react';
import './App.css';
import Overworld from './Overworld/Overworld'
import Underworld from './Underworld/Underworld'
import UnderworldComplete from './Underworld/UnderworldComplete'
import Dialogue from './Dialogue/Dialogue'
import Underworld1 from './Levels/Underworld/1'

window.CANVASWIDTH = 50
window.CANVASHEIGHT = 18
window.DEFAULTGAMEWIDTH = 32
window.FPS = 45
// pixels per grid square
// TODO: base it on the window size. Add a resize listener.
window.GRIDSCALE = 32

function App() {

  const processUnderworldState = (state) => {
    const command = gameState.level.update(state)
    if (command.playScene) {
      setGameState((state) => {
        return {...state, scene: command.playScene}
      })
    }
    if (command.underWorldComplete) {
      setGameState((state) => {
        return { ...state, showUnderworldComplete: true }
      })
    }
  }
  const setLevel = (level) => {
    setGameState((state) => {
      return { ...state, level: level }
    })
  }
  const leaveUnderworld = () => {
    setLevel(gameState.level.nextLevel())
  }
  const setScene = (scene) => {
    setGameState((state) => {
      return { ...state, scene: scene }
    })
  }

  const [gameState, setGameState] = useState({level: new Underworld1()})

  return (
    <div className="App">
      <Underworld paused={gameState.scene} setGameState={processUnderworldState} level={gameState.level} />
      <UnderworldComplete finish={leaveUnderworld} show={gameState.showUnderworldComplete} />
      <Overworld />
      <Dialogue
        width={window.DEFAULTGAMEWIDTH * window.GRIDSCALE - 120}
        done={() => setScene(null)}
        level={gameState.level}
        scene={gameState.scene}
      />
    </div>
  )
}

export default App;
