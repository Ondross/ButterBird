import Underworld1 from '../Underworld/1'
import Underworld2 from '../Underworld/2'
import Underworld3 from '../Underworld/3'
import script from '../Scripts/Overworld/1'


function Overworld1() {
  let introPlayed = false
  let caveScenePlayed = false
  let party

  this.update = (playScene, info) => {
    if (!introPlayed) {
      playScene('Welcome')
      introPlayed = true
    }
    if (info === 'caveShown' && !caveScenePlayed) {
      caveScenePlayed = true
      playScene('FirstCaveEntrance')
    }
  }

  this.shops = {
    "armory": {},
    "shelter": {},
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
  }
}

export default new Overworld1()

