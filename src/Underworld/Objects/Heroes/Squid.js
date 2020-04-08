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
    "/images/squid/forward/1.png",
    "/images/squid/forward/3.png",
  ],
  up: [
    "/images/squid/up/1.png",
    "/images/squid/up/2.png",
  ],
  left: [
    "/images/squid/left/1.png",
    "/images/squid/left/2.png",
  ],
  right: [
    "/images/squid/right/1.png",
    "/images/squid/right/2.png",
  ],
  blink: [
    "/images/squid/forward/2.png",
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
  return new Hero(x, y, images, sounds)
}