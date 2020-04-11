import React, {useState, useEffect, useRef } from 'react';
import './Dialogue.css';

let spacebarDown
let lineReadyTimeout
function Dialogue(props) {
  const [textIndex, setTextIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [lines, setLines] = useState(null)
  const [inputValue, setInputValue] = useState(null)
  const [nextLineReady, setNextLineReady] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const inputRef = useRef(null)

  // hacky way to do autofocus.
  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [inputRef, showInput])

  useEffect(() => {
    const typeText = () => {
      setTextIndex(val => val + 1)
    }

    if (textIndex < 1) {
      clearTimeout(lineReadyTimeout)
    }

    let timeout
    if (lines && lines[lineIndex] && lines[lineIndex].line[textIndex]) {
      const line = lines[lineIndex]
      const punctuation = ['.', '?', '!', ','].indexOf(line.line[textIndex]) > -1
      let pauseLength = punctuation ? 350 / speed : 30 / speed
      if (textIndex === 0 && line.pause) {
        pauseLength = line.pause
      }
      timeout = setTimeout(typeText, pauseLength)
    } else {
      clearTimeout(lineReadyTimeout)
      lineReadyTimeout = setTimeout(() => setNextLineReady(true), 500)
    }
    return () => {clearTimeout(timeout)}
  }, [props, lineIndex, lines, speed, textIndex])


  useEffect(() => {
    const newLines = props.script
    setLines(newLines)

    const nextLine = () => {
      setLineIndex(val => val + 1)
      setNextLineReady(false)
      setTextIndex(0)
      setSpeed(1)
    }
    const keyDown = (event) => {
      if (event.key === ' ' && !spacebarDown) {
        if (!nextLineReady) {
          spacebarDown = true
          setSpeed(3)
        } else if (!newLines[lineIndex].prompt) {
          nextLine()
        }
      } else if (event.key === 'Escape') {
        setLineIndex(newLines.length)
      } else if (event.key === 'Enter' && newLines[lineIndex].prompt) {
        props.level.prompts[newLines[lineIndex].prompt](inputValue)
        setInputValue('')
        nextLine()
      }
    }
    const releaseSpacebar = (event) => {
      if (event.key === ' ') {
        spacebarDown = false
      }
    }


    if (newLines && newLines[lineIndex]) {

      if (newLines[lineIndex].prompt && nextLineReady) {
        setShowInput(true)
      } else {
        setShowInput(false)
      }

      document.addEventListener('keydown', keyDown)
      document.addEventListener('keyup', releaseSpacebar)
      return () => {
        document.removeEventListener('keydown', keyDown)
        document.removeEventListener('keyup', releaseSpacebar)
      }
    } else if (props.script) {
      props.done()
      setLineIndex(0)
      setTextIndex(0)
    }
  }, [setSpeed, setLineIndex, setTextIndex, lineIndex, props, lines, textIndex, nextLineReady, inputValue, setShowInput])

  if (!lines || !lines[lineIndex]) {
    return (null)
  }

  const speaker = (lines[lineIndex].speaker !== undefined && props.level.getSpeaker(lines[lineIndex].speaker)) || null
  const showPrompt = lines[lineIndex].prompt
  return (
    <div className="modal-container">
      <div className="dialogue-container">
        {speaker && <div className="avatar-highlight" />}
        {speaker && <img alt="avatar" className="avatar" src={speaker.avatar} />}
        <div className="dialogue">
          {speaker && <div className="speaker-name">{speaker.name || '???'}</div>}
          <div className="dialogue-text">
            {lines[lineIndex].line.slice(0, textIndex)}
          </div>
          {showInput && <input ref={inputRef} type='text' className="prompt-input" onChange={e => setInputValue(e.target.value)} />}
          {showInput && inputValue && <img alt="" src="/images/icons/enter.png" className="icon enter-icon" />}
          {nextLineReady && !showPrompt && <img alt="" src="/images/icons/spacebar.png" className="icon spacebar-icon" />}
        </div>
      </div>
    </div>
  )
}

export default Dialogue;
