import React, {useState, useEffect } from 'react';
import './Dialogue.css';
import Level1Lines from './Scripts/Underworld/Level1'

const Script = {
  Underworld1: Level1Lines
}

let spacebarDown
let lineReadyTimeout
function Dialogue(props) {
  const [textIndex, setTextIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [lines, setLines] = useState(null)
  const [nextLineReady, setNextLineReady] = useState(false)

  useEffect(() => {
    const typeText = () => {
      setTextIndex(val => val + 1)
    }

    if (textIndex < 1) {
      clearTimeout(lineReadyTimeout)
    }

    let timeout
    if (lines && lines[lineIndex] && lines[lineIndex][textIndex + 1]) {
      const punctuation = ['.', '?', '!'].indexOf(lines[lineIndex][textIndex]) > -1
      const pauseLength = punctuation ? 350 / speed : 30 / speed
      timeout = setTimeout(typeText, pauseLength)
    } else {
      clearTimeout(lineReadyTimeout)
      lineReadyTimeout = setTimeout(() => setNextLineReady(true), 500)
    }
    return () => {clearTimeout(timeout)}
  })


  useEffect(() => {
    const newLines = (props.level && props.scene) && Script[props.level][props.scene]
    setLines(newLines)

    const nextLine = (event) => {
      if (event.key === ' ' && !spacebarDown) {
        if (!nextLineReady) {
          spacebarDown = true
          setSpeed(3)
        } else {
          setLineIndex(val => val + 1)
          setNextLineReady(false)
          setTextIndex(0)
          setSpeed(1)
        }
      }
    }
    const releaseSpacebar = (event) => {
      if (event.key === ' ') {
        spacebarDown = false
      }
    }

    if (newLines && newLines[lineIndex]) {
      document.addEventListener('keydown', nextLine)
      document.addEventListener('keyup', releaseSpacebar)
      return () => {
        document.removeEventListener('keydown', nextLine)
        document.removeEventListener('keyup', releaseSpacebar)
      }
    } else if (props.scene) {
      props.done()
      setLineIndex(0)
      setTextIndex(0)
    }
  }, [setSpeed, setLineIndex, setTextIndex, lineIndex, props, lines, textIndex, nextLineReady])

  const boxStyle = {width: `${props.width}px`}

  if (!lines || !lines[lineIndex]) {
    return (null)
  }

  return (
    <div className="dialogue-container">
      <div style={boxStyle} className="dialogue">
        {lines[lineIndex].slice(0, textIndex + 1)}
        {nextLineReady && <img alt="" src="/images/icons/spacebar.png" className="spacebar-icon" />}
      </div>
    </div>
  )
}

export default Dialogue;
