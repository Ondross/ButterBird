import script from '../Scripts/Underworld/2'
import Common from './common'

const background = new Image()
background.src = '/images/backgrounds/art.png'

function Underworld2() {
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
    numRooms: 2,
    averageEnemiesPerRoom: 2,
    minimumEnemiesPerRoom: 1,
    background: background,
  }

  this.script = script
  this.name = 'More Monsters'
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

export default new Underworld2()
