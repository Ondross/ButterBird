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
    "/images/characters/man/down/1.png",
    "/images/characters/man/down/2.png",
  ],
  up: [
    "/images/characters/man/up/1.png",
    "/images/characters/man/up/2.png",
  ],
  left: [
    "/images/characters/man/left/1.png",
    "/images/characters/man/left/2.png",
  ],
  right: [
    "/images/characters/man/right/1.png",
    "/images/characters/man/right/2.png",
  ],
  blink: [
    "/images/characters/man/blink/1.png",
  ],
  avatar: ["/images/characters/man/down/1.png"],
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
  attack: 2,
  health: 1,
  speed: 9,
  range: 5,
}

export default function Man() {
  return new Hero(images, sounds, baseStats)
}