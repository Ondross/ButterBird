import Overworld1 from '../Overworld/1.js'
import script from '../Scripts/Underworld/2.js'

const background = new Image()
background.src = '/images/backgrounds/art.png'

function Underworld2() {
  let introPlayed = false
  let levelComplete = false
  let died = false

  this.update = (gamestate) => {
    const command = {}
    if (!introPlayed) {
      command.playScene = 'Intro'
      introPlayed = true
    }

    if (!levelComplete && gamestate.level.rooms.every(room => room.enemies.length === 0 && room.visited)) {
      command.underWorldComplete = true
      levelComplete = true
    }
    if (gamestate.events.dead && !died) {
      command.playScene = 'YouDied'
      died = true
    }

    return command
  }

  this.levelParameters = {
    numRooms: 5,
    averageEnemiesPerRoom: 5,
    background: background,
  }

  this.script = script
  this.name = 'Underworld2'
  this.type = "underworld"
  this.nextLevel = Overworld1
}

export default () => new Underworld2()