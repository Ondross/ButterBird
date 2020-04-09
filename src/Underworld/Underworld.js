import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Underworld.css';
import Gameloop from './Gameloop'

function Underworld(props) {
  const canvas = useRef(null)
  const [world] = useState(new Gameloop(canvas.current))

  const gameLoop = useCallback(() => {
    world.update(1000 / window.FPS)

    if (world.getState().congratulations) {
      console.log('boom')
    }

    setTimeout(() => gameLoop(), 1000 / window.FPS)
  }, [world])

  function pause() {
    world.pause(props.paused)
  }

  useEffect(pause, [props.paused])
  useEffect(() => {
    if (canvas) {
      world.setCanvas(canvas.current)
      gameLoop()
    }
  }, [canvas, world, gameLoop])

  const containerStyle = { width: window.CANVASWIDTH * window.GRIDSCALE, height: window.CANVASHEIGHT * window.GRIDSCALE }
  return (
    <div className="underworld-container" style={containerStyle}>
      <canvas ref={canvas} width={window.CANVASWIDTH * window.GRIDSCALE} height={window.CANVASHEIGHT * window.GRIDSCALE} />
    </div>
  )
}

export default Underworld;
