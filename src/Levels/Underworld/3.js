import script from '../Scripts/Underworld/3'

const background = new Image()
background.src = '/images/backgrounds/art.png'

function Underworld3() {
  let died = false
  let party

  this.update = (gamestate, playScene, setUnderWorldComplete) => {
    if (gamestate.level.rooms.every(room => room.enemies.length === 0 && room.visited)) {
      setUnderWorldComplete(true)
      this.completed = true
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
  this.name = 'Friend'
  this.type = 'underworld'
  this.completed = false

  this.getSpeaker = characterId => ({
    avatar: party[characterId].images.avatar[characterId].src,
    name: party[characterId].name
  })

  // call on entering the level
  this.init = (team) => {
    party = team
  }
}

export default new Underworld3()
