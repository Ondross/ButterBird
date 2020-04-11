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
    "/images/characters/squid/down/1.png",
    "/images/characters/squid/down/2.png",
  ],
  up: [
    "/images/characters/squid/up/1.png",
    "/images/characters/squid/up/2.png",
  ],
  left: [
    "/images/characters/squid/left/1.png",
    "/images/characters/squid/left/2.png",
  ],
  right: [
    "/images/characters/squid/right/1.png",
    "/images/characters/squid/right/2.png",
  ],
  blink: [
    "/images/characters/squid/blink/1.png",
  ],
  avatar: ["/images/characters/squid/down/1.png"],
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
}

export default function Squid() {
  return new Hero(images, sounds, baseStats)
}