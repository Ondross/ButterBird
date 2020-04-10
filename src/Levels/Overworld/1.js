import Underworld1 from '../Underworld/1.js'
import Underworld2 from '../Underworld/2.js'
import script from '../Scripts/Overworld/1.js'

function Overworld1() {
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
}

// overworld levels don't get re-inited when we need them.
const overworld = new Overworld1()
export default () => overworld
