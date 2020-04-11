import script from '../Scripts/Underworld/2'

const background = new Image()
background.src = '/images/backgrounds/art.png'

function Underworld2() {
  let introPlayed = false
  let died = false
  let party

  this.update = (gamestate, playScene, setUnderWorldComplete) => {
    if (!introPlayed) {
      playScene(script.Intro)
      introPlayed = true
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
    averageEnemiesPerRoom: 3,
    minimumEnemiesPerRoom: 1,
    background: background,
  }

  this.script = script
  this.name = 'More Monsters'
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

export default new Underworld2()
