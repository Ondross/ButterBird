import React, {useState} from 'react';
import './App.css';
import Overworld from './Overworld/Overworld'
import Underworld from './Underworld/Underworld'
import UnderworldComplete from './Underworld/UnderworldComplete'
import Dialogue from './Dialogue/Dialogue'
import Underworld1 from './Levels/Underworld/1'
import Overworld1 from './Levels/Overworld/1'
import Squid from './Underworld/Objects/Heroes/Squid';
import Napkin from './Underworld/Objects/Heroes/Napkin';

window.CANVASWIDTH = 50
window.CANVASHEIGHT = 24
window.FPS = 45

const party = [new Napkin()]
const startingLevel = Underworld1
startingLevel.init(party)

function App() {
  const [appState, setAppState] = useState({ level: startingLevel })

  const setLevel = (level) => {
    level.init(party)
    setAppState(state => ({ ...state, level: level, showUnderworldComplete: false }))
  }
  const nextLevel = () => {
    setLevel(appState.level.nextLevel || Overworld1)
  }
  const playScene = (scene) => setAppState(state => ({...state, scene: scene }))
  const underworldComplete = () => setAppState(state => ({...state, showUnderworldComplete: true }))

  return (
    <div className="App">
      <Underworld
        paused={appState.scene}
        playScene={playScene}
        underworldComplete={underworldComplete}
        level={appState.level}
        party={party}
      />
      <UnderworldComplete finish={nextLevel} show={appState.showUnderworldComplete} />
      {appState.level.type === 'overworld' && <Overworld
        level={appState.level}
        playScene={playScene}
        party={party}
        setLevel={setLevel}
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
