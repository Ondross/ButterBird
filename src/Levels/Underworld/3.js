import script from '../Scripts/Underworld/3'
import Common from './common'
import Squid from '../../Underworld/Objects/Heroes/Squid'

const background = new Image()
background.src = '/images/backgrounds/space.jpg'

function Underworld3() {
  const common = new Common()
  let friendEncountered = false
  let party
  let level
  let friendRecruited = false

  // todo, abstract some of this into a shared function.
  this.update = (gamestate, playScene, setUnderWorldComplete) => {
    common.update(gamestate, playScene)
    level = gamestate.level
    const editScene = (lines) => {
      return lines.map(line => (
        {...line, text: line.text.replace('<hero>', party[0].name)}
      ))
    }

    if (gamestate.level.rooms.every(room => room.enemies.length === 0 && room.visited && party.length > 1)) {
      setUnderWorldComplete(true)
      this.completed = true
    }
    if (gamestate.level.currentRoom.npcs.length > 0 && !friendEncountered) {
      playScene(editScene(script.FriendEncounter))
      friendEncountered = true
    }
    if (gamestate.events.recruitNpc && !friendRecruited) {
      playScene(editScene(script.FriendRecruited))
      friendRecruited = true
      gamestate.events.recruitNpc.isNpc = false
      party.push(gamestate.events.recruitNpc)
    }
  }

  this.parameters = {
    numRooms: 4,
    averageEnemiesPerRoom: 2,
    background: background,
    npcs: [new Squid()]
  }

  this.script = script
  this.name = 'Find a Friend'
  this.type = 'underworld'
  this.completed = false

  this.getSpeaker = characterId => {
    const chars = [party[characterId], level.npcs[0]]
    return {
      avatar: chars[characterId].images.avatar[0].src,
      name: chars[characterId].name
    }
  }

  this.prompts = {
    askName: (name) => {
      party[1].name = name
    }
  }

  // call on entering the level
  this.init = (team) => {
    party = team
  }
}

export default new Underworld3()
