import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Underworld.css';
import Gameloop from './Gameloop'

let gameloopTimeout
function Underworld(props) {
  const canvas = useRef(null)
  const [world] = useState(new Gameloop(canvas.current))

  const gameLoop = useCallback(() => {
    world.update(1000 / window.FPS)

    props.setGameState(world.getState())

    gameloopTimeout = setTimeout(() => gameLoop(), 1000 / window.FPS)
  }, [world, props])

  function pause() {
    world.pause(props.paused)
  }

  useEffect(pause, [props.paused])
  useEffect(() => {
    if (canvas.current && world && gameLoop) {
      world.setCanvas(canvas.current)
      gameLoop()
    }
    return () => {clearTimeout(gameloopTimeout)}
  }, [canvas, world, gameLoop])

  const containerStyle = { width: window.CANVASWIDTH * window.GRIDSCALE, height: window.CANVASHEIGHT * window.GRIDSCALE }
  return (
    <div className="underworld-container" style={containerStyle}>
      <canvas ref={canvas} width={window.CANVASWIDTH * window.GRIDSCALE} height={window.CANVASHEIGHT * window.GRIDSCALE} />
    </div>
  )
}

export default Underworld;
