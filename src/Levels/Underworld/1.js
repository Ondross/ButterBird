import Underworld2 from './2'
import script from '../Scripts/Underworld/1'

const background = new Image()
background.src = '/images/backgrounds/space.jpg'

function Underworld1() {
  let introPlayed = false
  let enemiesExplained = false
  let firstKill = false
  let died = false
  let party

  this.update = (gamestate, playScene, setUnderWorldComplete) => {
    if (!introPlayed) {
      playScene(script.Intro)
      introPlayed = true
    }

    if (gamestate.level.currentRoom.enemies.length > 0 && !enemiesExplained) {
      playScene(script.ExplainEnemies)
      enemiesExplained = true
    }
    if (gamestate.events.enemyDestroyed  && !firstKill) {
      playScene(script.FirstKill)
      firstKill = true
    }
    if (gamestate.level.rooms.every(room => room.enemies.length === 0 && room.visited)) {
      this.completed = true
      setUnderWorldComplete(true)
    }
    if (gamestate.events.dead && !died) {
      playScene(script.YouDied)
      died = true
    }
  }

  this.levelParameters = {
    numRooms: 2,
    averageEnemiesPerRoom: 2,
    minimumEnemiesPerRoom: 2,
    background: background,
  }

  this.script = script
  this.name = 'Intro'
  this.type = "underworld"
  this.completed = false

  // tricky: the followup to this changes after you've beaten it the first time.
  let nextLevel = Underworld2
  this.nextLevel = () => {
    const toReturn = nextLevel
    nextLevel = null
    return toReturn
  }
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

  // call on entering the level
  this.init = (team) => {
    party = team
  }
}

export default new Underworld1()