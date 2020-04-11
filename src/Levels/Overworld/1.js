import Underworld1 from '../Underworld/1.js'
import Underworld2 from '../Underworld/2.js'
import script from '../Scripts/Overworld/1.js'

function Overworld1(party) {
  let introPlayed = false

  this.update = (playScene) => {
    if (!introPlayed) {
      playScene('Welcome')
      introPlayed = true
    }
  }

  this.shops = {
    "armory": {},
    "barracks": {},
  }

  this.backgroundSrc = '/images/backgrounds/marsOverworld.png'
  this.name = "Overworld1"
  this.type = "overworld"
  this.script = script
  this.levels = {
    'Intro': Underworld1,
    'Find a Friend': Underworld2,
  }

  this.getSpeaker = characterId => ({
    avatar: party[characterId].images.avatar[characterId].src,
    name: party[characterId].name
  })
}

// overworld levels don't get re-inited when we need them.
let overworld
export default (party) => {
  overworld = overworld || new Overworld1(party)
  return overworld
}
