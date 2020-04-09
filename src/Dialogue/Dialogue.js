import React, {useState, useEffect, useCallback } from 'react';
import './Dialogue.css';

function Dialogue(props) {
  const [textIndex, setTextIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [speed, setSpeed] = useState(1)

  const fullLineDisplayed = useCallback(() => {
    return !props.lines[lineIndex][textIndex + 1]
  }, [props.lines, lineIndex, textIndex])

  useEffect(() => {
    const typeText = () => {
      setTextIndex(textIndex + 1)
    }

    let timeout
    if (props.lines[lineIndex] && !fullLineDisplayed()) {
      const punctuation = ['.', '?', '!'].indexOf(props.lines[lineIndex][textIndex]) > -1
      const pauseLength = punctuation ? 350 / speed : 30 / speed
      timeout = setTimeout(typeText, pauseLength)
    }
    return () => {clearTimeout(timeout)}
  })

  useEffect(() => {
    const nextLine = (event) => {
      if (event.key === ' ') {
        if (!fullLineDisplayed()) {
          setSpeed(5)
        } else {
          setLineIndex(lineIndex + 1)
          setTextIndex(0)
          setSpeed(1)
        }
      }
    }

    if (props.lines[lineIndex]) {
      document.addEventListener('keydown', nextLine)
      return () => document.removeEventListener('keydown', nextLine)
    } else {
      props.done(true)
    }
  }, [setSpeed, setLineIndex, setTextIndex, lineIndex, props, textIndex, fullLineDisplayed])

  const boxStyle = {width: `${props.width}px`}

  if (!props.lines[lineIndex]) {
    return (null)
  }

  return (
    <div className="dialogue-container">
      <div style={boxStyle} className="dialogue">
        {props.lines[lineIndex].slice(0, textIndex + 1)}
        {fullLineDisplayed() && <img alt="" src="/images/icons/spacebar.png" className="spacebar-icon" />}
      </div>
    </div>
  )
}

export default Dialogue;
