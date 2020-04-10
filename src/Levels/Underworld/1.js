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

  this.update = (gamestate, playScene, setUnderWorldComplete) => {
    if (!introPlayed) {
      playScene('Intro')
      introPlayed = true
    }

    if (gamestate.level.currentRoom.enemies.length > 0 && !enemiesExplained) {
      playScene('ExplainEnemies')
      enemiesExplained = true
    }
    if (gamestate.events.enemyDestroyed  && !firstKill) {
      playScene('FirstKill')
      firstKill = true
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
    averageEnemiesPerRoom: 2,
    minimumEnemiesPerRoom: 1,
    background: background,
  }

  this.script = script
  this.name = 'Underworld1'
  this.type = "underworld"
  this.nextLevel = Underworld2
}
