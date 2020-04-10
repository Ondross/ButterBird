import Overworld1 from '../Overworld/1.js'
import script from '../Scripts/Underworld/2.js'

const background = new Image()
background.src = '/images/backgrounds/art.png'

function Underworld2() {
  let introPlayed = false
  let levelComplete = false
  let died = false

  this.update = (gamestate, playScene, setUnderWorldComplete) => {
    if (!introPlayed) {
      playScene('Intro')
      introPlayed = true
    }

    if (!levelComplete && gamestate.level.rooms.every(room => room.enemies.length === 0 && room.visited)) {
      setUnderWorldComplete(true)
      levelComplete = true
    }
    if (gamestate.events.dead && !died) {
      playScene('YouDied')
      died = true
    }
  }

  this.levelParameters = {
    numRooms: 2,
    averageEnemiesPerRoom: 3,
    background: background,
  }

  this.script = script
  this.name = 'Underworld2'
  this.type = "underworld"
  this.nextLevel = Overworld1
}

export default () => new Underworld2()