import React, {useState} from 'react';
import './App.css';
import Overworld from './Overworld/Overworld'
import Underworld from './Underworld/Underworld'
import UnderworldComplete from './Underworld/UnderworldComplete'
import StartScreen from './StartScreen'
import Dialogue from './Dialogue/Dialogue'
import Underworld1 from './Levels/Underworld/1'
import Overworld1 from './Levels/Overworld/1'
import Napkin from './Underworld/Objects/Heroes/Napkin';
import Squid from './Underworld/Objects/Heroes/Squid';
import MusicPlayer from './MusicPlayer/MusicPlayer'

window.CANVASWIDTH = 50
window.CANVASHEIGHT = 24
window.FPS = 45

const musicPlayer = new MusicPlayer({
  'fight': '/songs/Truth Magnum.mp3',
  'calm': '/songs/explore.mp3',
})
const party = [new Napkin()]
const startingLevel = Underworld1

function App() {
  const [appState, setAppState] = useState({ level: {type: "startScreen", nextLevel: () => startingLevel} })

  const setLevel = (level) => {
    level.init(party)
    setAppState(state => ({ ...state, level: level, showUnderworldComplete: false }))
  }
  const nextLevel = () => {
    const next = appState.level.nextLevel && appState.level.nextLevel()
    setLevel(next || Overworld1)
  }
  const playScene = (lines) => setAppState(state => ({ ...state, lines: lines }))
  const setDifficulty = (difficulty) => setAppState(state => ({ ...state, difficulty: difficulty }))
  const underworldComplete = () => appState.showUnderworldComplete || setAppState(state => ({...state, showUnderworldComplete: true }))

  return (
    <div className="App">
      <Underworld
        paused={!!appState.lines}
        playScene={playScene}
        underworldComplete={underworldComplete}
        level={appState.level}
        musicPlayer={musicPlayer}
        party={party}
        difficulty={appState.difficulty}
      />
      <UnderworldComplete finish={nextLevel} show={appState.showUnderworldComplete && !appState.lines} />
      {appState.level.type === 'overworld' && <Overworld
        level={appState.level}
        playScene={playScene}
        party={party}
        setLevel={setLevel}
        paused={!!appState.lines}
        musicPlayer={musicPlayer}
      />}
      {appState.level.type === "startScreen" && <StartScreen start={nextLevel} setDifficulty={setDifficulty} />}
      <Dialogue
        done={() => playScene(null)}
        level={appState.level}
        script={appState.lines}
      />
    </div>
  )
}

export default App;
