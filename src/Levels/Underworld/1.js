import Underworld2 from '../Underworld/2.js'
import script from '../Scripts/Underworld/1.js'


const background = new Image()
background.src = '/images/backgrounds/space.jpg'

export default function Underworld1() {
  let introPlayed = false
  let enemiesExplained = false
  let firstKill = false
  let levelComplete = false
  let died = false

  this.update = (gamestate) => {
    const command = {}
    if (!introPlayed) {
      command.playScene = 'Intro'
      introPlayed = true
    }

    if (gamestate.level.currentRoom.enemies.length > 0 && !enemiesExplained) {
      command.playScene = 'ExplainEnemies'
      enemiesExplained = true
    }
    if (gamestate.events.enemyDestroyed  && !firstKill) {
      command.playScene = 'FirstKill'
      firstKill = true
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
    numRooms: 2,
    averageEnemiesPerRoom: 2,
    minimumEnemiesPerRoom: 1,
    background: background,
  }

  this.script = script
  this.name = 'Underworld1'
  this.type = "underworld"
  this.nextLevel = Underworld2
}
