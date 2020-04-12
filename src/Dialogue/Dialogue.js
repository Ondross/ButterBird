import React, {useState, useEffect, useRef } from 'react';
import './Dialogue.css';

let spacebarDown
let nextLineReadyTimeout
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
    const line = (lines && lines[lineIndex]) || null
    const text = (line && line.text) || null
    const typeText = () => {
      setTextIndex(val => val + 1)
    }

    if (textIndex < 1 && text && text.length > 1) {
      clearTimeout(nextLineReadyTimeout)
      setNextLineReady(false)
    }

    let timeout
    const moreTextAhead = text && text[textIndex]
    if (moreTextAhead) {
      const punctuation = ['.', '?', '!', ','].indexOf(text[textIndex]) > -1
      let pauseLength = punctuation ? 350 / speed : 30 / speed
      if (textIndex === 0 && line.pause) {
        pauseLength = line.pause
      }
      timeout = setTimeout(typeText, pauseLength)
    } else {
      clearTimeout(nextLineReadyTimeout)
      nextLineReadyTimeout = setTimeout(() => setNextLineReady(true), 500)
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


  const line = lines && lines[lineIndex]
  if (!line) {
    return (null)
  }

  const speaker = (line.speaker !== undefined && props.level.getSpeaker(line.speaker)) || null
  const showPrompt = line.prompt

  return (
    <div className="modal-container">
      <div className="dialogue-container">
        {speaker && <div className="avatar-highlight" />}
        {speaker && <img alt="avatar" className="avatar" src={speaker.avatar} />}
        <div className="dialogue">
          {speaker && <div className="speaker-name">{speaker.name || '???'}</div>}
          <div className="dialogue-text">
            {line.text.slice(0, textIndex)}
          </div>
          {showInput && <input maxLength={line.maxLength} ref={inputRef} type='text' className="prompt-input" onChange={e => setInputValue(e.target.value)} />}
          {showInput && inputValue && <img alt="" src="/images/icons/enter.png" className="icon enter-icon" />}
          {nextLineReady && !showPrompt && <img alt="" src="/images/icons/spacebar.png" className="icon spacebar-icon" />}
        </div>
      </div>
    </div>
  )
}

export default Dialogue;
