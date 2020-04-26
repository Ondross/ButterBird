import script from '../Scripts/Underworld/common'

function Common() {
  let died = false
  let gameOver = false
  
  this.update = (gamestate, playScene) => {
    if (gamestate.events.dead && !died) {
      playScene(script.YouDied)
      died = true
    }
    if (gamestate.events.gameOver && !gameOver) {
      playScene(script.GameOver)
      gameOver = true
    }
  }

}

export default Common
