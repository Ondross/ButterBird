import React from 'react';
import './Modal.css';
import './StartScreen.css';


function StartScreen({start, setDifficulty}) {
  const submit = (difficulty) => {
    setDifficulty(difficulty)
    start()
  }
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="title">ButterBird</div>
        <div className="difficulty-select">
          <div className="subtitle">Select difficulty</div>
          <div onClick={() => submit(1)} className="modal-button">Casual</div>
          <div onClick={() => submit(2)} className="modal-button">Medium</div>
          <div onClick={() => submit(3)} className="modal-button">BRUTAL</div>
        </div>
      </div>   
    </div>
  )
}

export default StartScreen;
