import React, { useRef, useEffect } from 'react';
import './App.css';
import World from './canvas/World'

const GAMEWIDTH = "800"
const GAMEHEIGHT = "600"
const FPS = 60

function App() {

  function gameLoop(world) {
    world.update(1000 / FPS)
    //console.log(world.getState())

    setTimeout(() => gameLoop(world), 1000 / FPS)
  }

  function init() {
    if (canvas) {
      const world = new World(canvas.current, GAMEWIDTH, GAMEHEIGHT)
      gameLoop(world)
    } else {
      setTimeout(init, 100)
    }
  }

  useEffect(init)
  const canvas = useRef(null)

  return (
    <div className="App">
      <header className="App-header">Game</header>
      <canvas ref={canvas} width={GAMEWIDTH} height={GAMEHEIGHT} />
      <audio src="sounds/ow/1.m4a" className="ow" />
      <audio src="sounds/ow/2.m4a" className="ow" />
      <audio src="sounds/ow/3.m4a" className="ow" />
      <audio src="sounds/ow/4.m4a" className="ow" />
      <audio src="sounds/ow/5.m4a" className="ow" />
    </div>
  )
}

export default App;
