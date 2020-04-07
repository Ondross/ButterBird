import React, { useRef, useEffect } from 'react';
import './App.css';
import World from './canvas/UnderworldGame'

window.GAMEWIDTH = 24
window.GAMEHEIGHT = 18
window.FPS = 45
// pixels per grid square
window.GRIDSCALE = 32

function App() {

  function gameLoop(world) {
    world.update(1000 / window.FPS)

    setTimeout(() => gameLoop(world), 1000 / window.FPS)
  }

  function init() {
    if (canvas) {
      const world = new World(canvas.current)
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
      <canvas ref={canvas} width={window.GAMEWIDTH * window.GRIDSCALE} height={window.GAMEHEIGHT * window.GRIDSCALE} />
    </div>
  )
}

export default App;
