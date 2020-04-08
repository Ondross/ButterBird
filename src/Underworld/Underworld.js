import React, { useRef, useEffect } from 'react';
import './Underworld.css';
import Gameloop from './Gameloop'

function Underworld(props) {


  function gameLoop(world) {
    world.update(1000 / window.FPS)

    if (world.getState().congratulations) {
      console.log('boom')
    }

    setTimeout(() => gameLoop(world), 1000 / window.FPS)
  }

  const underWorld = useRef(null)
  function init() {
    if (underWorld && props.active) {
      const world = new Gameloop(underWorld.current)
      gameLoop(world)
    } else {
      setTimeout(init, 100)
    }
  }

  useEffect(init, [props.active])

  const containerStyle = { width: window.CANVASWIDTH * window.GRIDSCALE, height: window.CANVASHEIGHT * window.GRIDSCALE }
  return (
    <div className="underworld-container" style={containerStyle}>
      <canvas ref={underWorld} width={window.CANVASWIDTH * window.GRIDSCALE} height={window.CANVASHEIGHT * window.GRIDSCALE} />
    </div>
  )
}

export default Underworld;
