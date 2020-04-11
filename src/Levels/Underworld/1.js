import Underworld2 from '../Underworld/2.js'
import script from '../Scripts/Underworld/1.js'


const background = new Image()
background.src = '/images/backgrounds/space.jpg'

function Underworld1(party) {
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
  this.prompts = {
    askName: (name) => {
      party[0].name = name
    }
  }

  // scripts have numbers for each line.
  // 0 usually refers to the first character in your party.
  // each level has to figure it out.
  this.getSpeaker = characterId => ({
    avatar: party[characterId].images.avatar[characterId].src,
    name: party[characterId].name
  })
}

export default (party) => new Underworld1(party)