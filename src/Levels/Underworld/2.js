import Overworld1 from '../Overworld/1.js'
import script from '../Scripts/Underworld/1.js'

export default function Underworld1() {
  let introPlayed = false
  let levelComplete = false

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

    return command
  }

  this.levelParameters = {
    numRooms: 5,
    averageEnemiesPerRoom: 5
  }

  this.script = script
  this.name = 'Underworld2'
  this.type = "underworld"
  this.nextLevel = () => new Overworld1()
}
