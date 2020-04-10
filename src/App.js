import React, {useState} from 'react';
import './App.css';
import Overworld from './Overworld/Overworld'
import Underworld from './Underworld/Underworld'
import UnderworldComplete from './Underworld/UnderworldComplete'
import Dialogue from './Dialogue/Dialogue'
import Underworld1 from './Levels/Underworld/1'
import Overworld1 from './Levels/Overworld/1'

window.CANVASWIDTH = 50
window.CANVASHEIGHT = 24
window.FPS = 45

function App() {
  const processLevelState = (state) => {
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
  const leaveUnderworld = () => {
    setGameState((state) => {
      return { ...state, level: gameState.level.nextLevel(), showUnderworldComplete: false }
    })
  }
  const setScene = (scene) => {
    setGameState((state) => {
      return { ...state, scene: scene }
    })
  }

  const [gameState, setGameState] = useState({level: new Underworld1()})

  return (
    <div className="App">
      <Underworld paused={gameState.scene} setGameState={processLevelState} level={gameState.level} />
      <UnderworldComplete finish={leaveUnderworld} show={gameState.showUnderworldComplete} />
      {gameState.level.type === 'overworld' && <Overworld level={gameState.level} setGameState={processLevelState} />}
      <Dialogue
        done={() => setScene(null)}
        level={gameState.level}
        scene={gameState.scene}
      />
    </div>
  )
}

export default App;
