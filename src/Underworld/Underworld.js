import React, { useRef, useEffect, useCallback } from 'react';
import './Underworld.css';
import Gameloop from './Gameloop'


let gameloopTimeout
const gameloop = new Gameloop()

function Underworld(props) {
  const canvasElement = useRef(null)

  const updateGame = useCallback(() => {
    if (props.level.type === 'underworld') {
      gameloop.update()
    }

    props.level.update(gameloop.getState(), props.playScene, props.setUnderworldComplete)

    // requestAnimationFrame itself was too fast. Seems weird to be using this and a timeout.
    gameloopTimeout = setTimeout(() => requestAnimationFrame(updateGame), 15)
  }, [props])

  function pause() {
    gameloop.pause(props.paused)
  }

  useEffect(() => {
    if (props.level.type === 'underworld') {
      gameloop.newLevel(props.level.levelParameters)
    }
  }, [props.level])
  useEffect(pause, [props.paused])
  useEffect(() => {
    if (canvasElement.current) {
      gameloop.setCanvas(canvasElement.current)
      updateGame()
    }
    return () => {clearTimeout(gameloopTimeout)}
  }, [canvasElement, updateGame])

  if (props.level.type !== 'underworld') {
    return (null)
  }

  return (
      <canvas ref={canvasElement} />
  )
}

export default Underworld;
