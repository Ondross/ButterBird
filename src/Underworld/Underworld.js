import React, { useRef, useEffect, useCallback } from 'react';
import './Underworld.css';
import Gameloop from './Gameloop'

let gameloopTimeout
const gameloop = new Gameloop()
function Underworld(props) {
  const canvas = useRef(null)
  const updateGame = useCallback(() => {
    gameloop.update(1000 / window.FPS)

    props.setGameState(gameloop.getState())

    gameloopTimeout = setTimeout(() => updateGame(), 1000 / window.FPS)
  }, [props])

  function pause() {
    gameloop.pause(props.paused)
  }

  useEffect(() => {
    gameloop.newLevel(props.level.levelParameters)
  }, [props.level])
  useEffect(pause, [props.paused])
  useEffect(() => {
    if (canvas.current) {
      gameloop.setCanvas(canvas.current)
      updateGame()
    }
    return () => {clearTimeout(gameloopTimeout)}
  }, [canvas, updateGame])

  if (props.level.type !== 'underworld') {
    return (null)
  }

  const containerStyle = { width: window.CANVASWIDTH * window.GRIDSCALE, height: window.CANVASHEIGHT * window.GRIDSCALE }
  return (
    <div className="underworld-container" style={containerStyle}>
      <canvas ref={canvas} width={window.CANVASWIDTH * window.GRIDSCALE} height={window.CANVASHEIGHT * window.GRIDSCALE} />
    </div>
  )
}

export default Underworld;
