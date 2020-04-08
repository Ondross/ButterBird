import Enemy from './Enemy'

const sounds = [
  "/sounds/ow/1.m4a",
  "/sounds/ow/3.m4a",
  "/sounds/ow/4.m4a",
  "/sounds/ow/5.m4a",
  "/sounds/ow/7.m4a",
  "/sounds/ow/8.m4a",
  "/sounds/ow/9.m4a",
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
}

const images = {}

Object.keys(imagePaths).forEach(type => {
  images[type] = imagePaths[type].map(src => {
    const imageObj = new Image()
    imageObj.src = src
    return imageObj
  })
})

export default function Squid (x, y) {
  return new Enemy(x, y, images, sounds)
}