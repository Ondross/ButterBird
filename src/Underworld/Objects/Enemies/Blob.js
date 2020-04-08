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
    "/images/blobBoy.png",
  ],
  up: [
    "/images/blobBoy.png",
  ],
  left: [
    "/images/blobBoy.png",
  ],
  right: [
    "/images/blobBoy.png",
  ],
  blink: [
    "/images/blobBoy.png",
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

export default function Blob(x, y) {
  const enemy = new Enemy(x, y, images, sounds)
  enemy.scream = () => {
    console.log("I AM Blob!")
  }
  return enemy
}
