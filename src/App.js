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

  const leaveUnderworld = () => {
    setAppState((state) => {
      return { ...state, level: appState.level.nextLevel(), showUnderworldComplete: false }
    })
  }
  const playScene = (scene) => {
    setAppState((state) => {
      return { ...state, scene: scene }
    })
  }
  const setUnderworldComplete = () => {
    setAppState((state) => {
      return { ...state, showUnderworldComplete: true }
    })
  }

  const [appState, setAppState] = useState({level: new Underworld1()})

  return (
    <div className="App">
      <Underworld
        paused={appState.scene}
        playScene={playScene}
        setUnderworldComplete={setUnderworldComplete}
        level={appState.level}
      />
      <UnderworldComplete finish={leaveUnderworld} show={appState.showUnderworldComplete} />
      {appState.level.type === 'overworld' && <Overworld
        level={appState.level}
        playScene={playScene}
      />}
      <Dialogue
        done={() => playScene(null)}
        level={appState.level}
        scene={appState.scene}
      />
    </div>
  )
}

export default App;
