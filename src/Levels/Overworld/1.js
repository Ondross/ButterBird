import Underworld1 from '../Underworld/1'
import Underworld2 from '../Underworld/2'
import Underworld3 from '../Underworld/3'
import script from '../Scripts/Overworld/1'


function Overworld1() {
  let introPlayed = false
  let caveScenePlayed = false
  let shelterScenePlayed = false
  let party

  this.update = (playScene, info) => {
    if (!introPlayed) {
      playScene(script.Welcome)
      introPlayed = true
    }
    if (info === 'caveShown' && !caveScenePlayed) {
      caveScenePlayed = true
      playScene(script.FirstCaveEntrance)
    }
    if (info === 'shelterShown') {
      let lines = []
      if (!shelterScenePlayed) {
        shelterScenePlayed = true
        lines = lines.concat(script.FirstShelterEntrance)
      }
      if (party.length < 2) {
        lines = lines.concat(script.UselessBuilding)
      }
      lines.length && playScene(lines)
    }
  }

  this.shops = {
    "armory": {},
    "shelter": {
      party: party
    },
    "cave": {
      levels: [Underworld1, Underworld2, Underworld3]
    },
  }

  this.backgroundSrc = '/images/backgrounds/marsOverworld.png'
  this.name = "Overworld1"
  this.type = "overworld"
  this.script = script

  this.getSpeaker = characterId => ({
    avatar: party[characterId].images.avatar[characterId].src,
    name: party[characterId].name
  })

  // call on entering the level
  this.init = (team) => {
    party = team
    this.shops.shelter.party = party
  }
}

export default new Overworld1()

