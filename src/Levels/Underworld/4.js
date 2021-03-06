import script from '../Scripts/Underworld/4'
import Common from './common'
import Man from '../../Underworld/Objects/Heroes/Man';

const background = new Image()
background.src = '/images/backgrounds/cave.jpg'

function Underworld4() {
  const common = new Common()
  let introPlayed = false
  let friendRecruited = false
  let friendEncountered = false
  let party
  let level

  this.update = (gamestate, playScene, setUnderWorldComplete) => {
    common.update(gamestate, playScene)
    level = gamestate.level

    const editScene = (lines) => {
      return lines.map(line => (
        { ...line, text: line.text.replace('<hero>', party[0].name) }
      ))
    }

    if (!introPlayed) {
      playScene(script.Intro)
      introPlayed = true
    }

    if (gamestate.level.rooms.every(room => room.enemies.length === 0 && room.visited)) {
      this.completed = true
      setUnderWorldComplete(true)
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
    numRooms: 6,
    averageEnemiesPerRoom: 3,
    minimumEnemiesPerRoom: 1,
    background: background,
    npcs: [new Man()],
  }

  this.script = script
  this.name = 'Hunting the Dead'
  this.type = 'underworld'
  this.completed = false

  this.getSpeaker = characterId => {
    const chars = [party[0], party[1] || party[0], level.npcs[0]]
    return {
      avatar: chars[characterId].images.avatar[0].src,
      name: chars[characterId].name
    }
  }

  this.prompts = {
    askName: (name) => {
      party[party.length - 1].name = name
    }
  }


  // call on entering the level
  this.init = (team) => {
    party = team
  }
}

export default new Underworld4()
