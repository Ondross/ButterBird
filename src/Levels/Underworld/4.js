import script from '../Scripts/Underworld/4'
import Common from './common'

const background = new Image()
background.src = '/images/backgrounds/cave.jpg'

function Underworld4() {
  const common = new Common()
  let introPlayed = false
  let party

  this.update = (gamestate, playScene, setUnderWorldComplete) => {
    common.update(gamestate, playScene)
    if (!introPlayed) {
      playScene(script.Intro)
      introPlayed = true
    }

    if (gamestate.level.rooms.every(room => room.enemies.length === 0 && room.visited)) {
      this.completed = true
      setUnderWorldComplete(true)
    }
  }

  this.parameters = {
    numRooms: 6,
    averageEnemiesPerRoom: 4,
    minimumEnemiesPerRoom: 1,
    background: background,
  }

  this.script = script
  this.name = 'Hunting the Dead'
  this.type = 'underworld'
  this.completed = false

  this.getSpeaker = characterId => ({
    avatar: party[characterId].images.avatar[0].src,
    name: party[characterId].name
  })

  // call on entering the level
  this.init = (team) => {
    party = team
  }
}

export default new Underworld4()
