import React, { useRef, useEffect } from 'react';
import './Underworld.css';
import Gameloop from './Gameloop'

window.GAMEWIDTH = 24
window.GAMEHEIGHT = 18
window.FPS = 45
// pixels per grid square
window.GRIDSCALE = 32

function Underworld() {


  function gameLoop(world) {
    world.update(1000 / window.FPS)

    if (world.getState().congratulations) {
      console.log('boom')
    }

    setTimeout(() => gameLoop(world), 1000 / window.FPS)
  }

  const underWorld = useRef(null)
  function init() {
    if (underWorld) {
      const world = new Gameloop(underWorld.current)
      gameLoop(world)
    } else {
      setTimeout(init, 100)
    }
  }

  useEffect(init, [])

  const containerStyle = { width: window.GAMEWIDTH * window.GRIDSCALE, height: window.GAMEHEIGHT * window.GRIDSCALE }
  return (
    <div className="underworld-container" style={containerStyle}>
      <canvas ref={underWorld} width={window.GAMEWIDTH * window.GRIDSCALE} height={window.GAMEHEIGHT * window.GRIDSCALE} />
    </div>
  )
}

export default Underworld;
