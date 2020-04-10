import React, {useState, useEffect } from 'react';
import './Dialogue.css';

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
  }, [props, lineIndex, lines, speed, textIndex])


  useEffect(() => {
    const newLines = (props.level && props.level.script && props.level.script[props.scene])
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
      } else if (event.key === 'Escape') {
        setLineIndex(newLines.length)
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

  if (!lines || !lines[lineIndex]) {
    return (null)
  }

  return (
    <div className="dialogue-container">
      <div className="dialogue">
        {lines[lineIndex].slice(0, textIndex + 1)}
        {nextLineReady && <img alt="" src="/images/icons/spacebar.png" className="spacebar-icon" />}
      </div>
    </div>
  )
}

export default Dialogue;
