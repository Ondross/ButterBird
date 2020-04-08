import React, {useState, useEffect } from 'react';
import './Dialogue.css';

function Dialogue(props) {
  const [textIndex, setTextIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    const typeText = () => {
      setTextIndex(textIndex + 1)
    }

    let timeout
    if (props.lines[lineIndex] && props.lines[lineIndex][textIndex + 1]) {
      const pauseLength = props.lines[lineIndex][textIndex] === '.' ? 200 / speed : 50 / speed
      timeout = setTimeout(typeText, pauseLength)
    }
    return () => {clearTimeout(timeout)}
  })

  useEffect(() => {
    const nextLine = () => {
      if (props.lines[lineIndex][textIndex + 1]) {
        setSpeed(5)
      } else {
        setLineIndex(lineIndex + 1)
        setTextIndex(0)
        setSpeed(1)
      }
    }

    if (props.lines[lineIndex]) {
      document.addEventListener('keydown', nextLine)
      return () => document.removeEventListener('keydown', nextLine)
    }
  }, [setSpeed, setLineIndex, setTextIndex, lineIndex, props.lines, textIndex])

  const boxStyle = {width: `${props.width}px`}

  if (!props.lines[lineIndex]) {
    props.done(true)
    return (null)
  }

  return (
    <div className="dialogue-container">
      <div style={boxStyle} className="dialogue">
        {props.lines[lineIndex].slice(0, textIndex + 1)}
      </div>
    </div>
  )
}

export default Dialogue;
