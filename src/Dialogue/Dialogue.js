import React, {useState, useEffect } from 'react';
import './Dialogue.css';
import Level1Lines from './Scripts/Underworld/Level1'

const Script = {
  Underworld1: Level1Lines
}

let spacebarDown
function Dialogue(props) {
  const [textIndex, setTextIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [lines, setLines] = useState([])
  const [nextLineReady, setNextLineReady] = useState(false)

  useEffect(() => {
    if (props.level && props.scene) {
      setLines(Script[props.level][props.scene])
    }
  }, [props.level, props.scene])

  useEffect(() => {
    const typeText = () => {
      setTextIndex(textIndex + 1)
    }

    let timeout
    if (lines[lineIndex] && lines[lineIndex][textIndex + 1]) {
      const punctuation = ['.', '?', '!'].indexOf(lines[lineIndex][textIndex]) > -1
      const pauseLength = punctuation ? 350 / speed : 30 / speed
      timeout = setTimeout(typeText, pauseLength)
    } else {
      setTimeout(() => setNextLineReady(true), 500)
    }
    return () => {clearTimeout(timeout)}
  })


  useEffect(() => {
    const nextLine = (event) => {
      if (event.key === ' ' && !spacebarDown) {
        if (!nextLineReady) {
          spacebarDown = true
          setSpeed(5)
        } else {
          setLineIndex(lineIndex + 1)
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

    if (lines[lineIndex]) {
      props.done(false)
      document.addEventListener('keydown', nextLine)
      document.addEventListener('keyup', releaseSpacebar)
      return () => {
        document.removeEventListener('keydown', nextLine)
        document.removeEventListener('keyup', releaseSpacebar)
      }
    } else {
      props.done(true)
    }
  }, [setSpeed, setLineIndex, setTextIndex, lineIndex, props, lines, textIndex, nextLineReady])

  const boxStyle = {width: `${props.width}px`}

  if (!lines[lineIndex]) {
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
