import Weapon from "./Weapon"
import Util from "./Util/Util"

const sounds = [
  "/sounds/deadHero/1.m4a",
].map(src => {
  const sound = new Audio()
  sound.src = src
  return sound
})

const downImages = [
  "/images/squid/forward/1.png",
  "/images/squid/forward/3.png",
].map(src => {
  const imageObj = new Image()
  imageObj.src = src
  return imageObj
})

const blinkImages = ["/images/squid/forward/2.png"].map(src => {
  const imageObj = new Image()
  imageObj.src = src
  return imageObj
})

const upImages = ["/images/squid/up/1.png",
  "/images/squid/up/2.png"
].map(
  src => {
    const imageObj = new Image()
    imageObj.src = src
    return imageObj
  }
)

const leftImages = ["/images/squid/left/1.png", "/images/squid/left/2.png"].map(
  src => {
    const imageObj = new Image()
    imageObj.src = src
    return imageObj
  }
)
const rightImages = [
  "/images/squid/right/1.png",
  "/images/squid/right/2.png"
].map(src => {
  const imageObj = new Image()
  imageObj.src = src
  imageObj.style.background = "blue"
  imageObj.class = "foo"
  return imageObj
})

const images = {
  down: downImages,
  up: upImages,
  left: leftImages,
  right: rightImages,
  blink: blinkImages
}

export default function Hero(x, y, keysDown) {  
  const speed = 3 // px / frame
  const weapon = new Weapon(this, keysDown)
  const width = 100
  const height = 100
  this.destroyed = false
  this.facing = 'down'

  const destroy = () => {
    if (this.destroyed === false) {
      sounds[0].currentTime = 0
      sounds[0].play()
    }
    this.destroyed = true
  }


  const update = (ctx, gametime, walls) => {
    if (this.destroyed) {
      return
    }
    let xVel = 0
    let yVel = 0
    keysDown.forEach((key) => {
      switch (key) {
        case ('w'):
          yVel = speed * -1
          this.facing = 'up'
          return
        case ('s'):
          yVel = speed
          this.facing = 'down'
          return
        case ('a'):
          xVel = speed * -1
          this.facing = 'left'
          return
        case ('d'):
          xVel = speed
          this.facing = 'right'
          return
      }
    })

    // shooting overrides movement for which way you're facing
    keysDown.forEach((key) => {
      switch (key) {
        case ('ArrowDown'):
          this.facing = 'down'
          return
        case ('ArrowUp'):
          this.facing = 'up'
          return
        case ('ArrowLeft'):
          this.facing = 'left'
          return
        case ('ArrowRight'):
          this.facing = 'right'
          return
      }
    })

    if (yVel && xVel) {
      yVel *= .71
      xVel *= 0.71
    }

    if (xVel || yVel) {
      const newX = x + xVel
      const newY = y + yVel
      const newVals = Util.tryUpdatingPosition(walls, this, newX, newY)
      x = newVals[0]
      y = newVals[1]
    }

    weapon.update(ctx, gametime, xVel, yVel)

    let image
    let imageIndex = 0
    // wiggle if you're moving
    if (xVel || yVel) {
      imageIndex = Math.floor(gametime * 10) % images[this.facing].length
    }
    // blink every now and then
    if (this.facing === 'down' && Math.random() > .95) {
      image = images['blink'][
        Math.floor(gametime * 10) % images['blink'].length
      ]
    } else {
      image = images[this.facing][imageIndex]
    }
    ctx.drawImage(
      image,
      x - width / 2,
      y - height / 2,
      width,
      height
    )
  }

  this.x = () => x
  this.y = () => y
  this.update = update
  this.weapon = weapon
  this.destroy = destroy
  this.hitboxWidthOffset = 25
  this.width = () => width
  this.height = () => height
}
