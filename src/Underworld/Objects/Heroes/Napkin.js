import Hero from './Hero'

const sounds = [
  "/sounds/deadHero/1.m4a",
].map(src => {
  const sound = new Audio()
  sound.src = src
  return sound
})

const imagePaths = {
  down: [
    "/images/characters/napkin/down/1.png",
    "/images/characters/napkin/down/2.png",
  ],
  up: [
    "/images/characters/napkin/up/1.png",
    "/images/characters/napkin/up/2.png",
  ],
  left: [
    "/images/characters/napkin/left/1.png",
    "/images/characters/napkin/left/2.png",
  ],
  right: [
    "/images/characters/napkin/right/1.png",
    "/images/characters/napkin/right/2.png",
  ],
  blink: [
    "/images/characters/napkin/blink/1.png",
    "/images/characters/napkin/blink/2.png",
    "/images/characters/napkin/blink/1.png",
  ],
  avatar: ["/images/characters/napkin/down/1.png"],
}

const images = {}

Object.keys(imagePaths).forEach(type => {
  images[type] = imagePaths[type].map(src => {
    const imageObj = new Image()
    imageObj.src = src
    return imageObj
  })
})

const baseStats = {
  attack: 1,
  health: 1,
  speed: 12,
  range: 10,
}

export default function Napkin () {
  return new Hero(images, sounds, baseStats)
}