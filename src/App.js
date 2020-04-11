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
const startingLevel = Overworld1
startingLevel.init(party)

function App() {
  const [appState, setAppState] = useState({ level: startingLevel })

  const setLevel = (level) => {
    level.init(party)
    setAppState(state => ({ ...state, level: level, showUnderworldComplete: false }))
  }
  const nextLevel = () => {
    const next = appState.level.nextLevel && appState.level.nextLevel()
    setLevel(next || Overworld1)
  }
  const playScene = (lines) => setAppState(state => ({...state, lines: lines }))
  const underworldComplete = () => appState.showUnderworldComplete || setAppState(state => ({...state, showUnderworldComplete: true }))

  return (
    <div className="App">
      <Underworld
        paused={!!appState.lines}
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
        paused={!!appState.lines}
      />}
      <Dialogue
        done={() => playScene(null)}
        level={appState.level}
        script={appState.lines}
      />
    </div>
  )
}

export default App;
