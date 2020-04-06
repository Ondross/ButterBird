import Weapon from "./Weapon"

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

export default function Hero(x, y, keysDown, walls) {  
  const speed = 4 // px / frame
  const weapon = new Weapon(this, keysDown)
  this.destroyed = false
  this.facing = 'down'

  const destroy = () => {
    if (this.destroyed === false) {
      sounds[0].currentTime = 0
      sounds[0].play()
    }
    this.destroyed = true
  }

  const checkPositionForWalls = (walls, x, y, newX, newY) => {
    const directionsOkay = [true, true]
    walls.forEach(w => {
      const currentXOverlap =
        Math.abs(w.centerX - x) < (this.hitboxWidth / 2 + w.width / 2)
      const currentYOverlap =
        Math.abs(w.centerY - y) < (this.height / 2 + w.height / 2)
      const newXOverlap =
        Math.abs(w.centerX - newX) < (this.hitboxWidth / 2 + w.width / 2)
      const newYOverlap =
        Math.abs(w.centerY - newY) < (this.height / 2 + w.height / 2)

      if (newXOverlap && newYOverlap) {
        if (!currentXOverlap) {
          directionsOkay[0] = false
        }
        if (!currentYOverlap) {
          directionsOkay[1] = false
        }
      }
    })
    return directionsOkay
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
      const newX = this.x + xVel
      const newY = this.y + yVel
      const [xOkay, yOkay] = checkPositionForWalls(walls, this.centerX, this.centerY, newX + this.width / 2, newY + this.height / 2)

      if (xOkay && yOkay) {
        this.x = newX
        this.y = newY
      } else if (xOkay) {
        this.x = newX
      } else if (yOkay) {
        this.y = newY
      } else {
        // we've hit a corner. Try just moving X.
        if (checkPositionForWalls(walls, this.centerX, this.centerY, newX + this.width / 2, this.centerY)[0]) {
          this.x = newX
        } else if (checkPositionForWalls(walls, this.centerX, this.centerY, this.centerX, newY + this.height / 2)[1]) {
          this.y = newY
        }
      }
      this.centerX = this.x + this.width / 2
      this.centerY = this.y + this.height / 2
    }

    weapon.update(ctx, gametime)

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
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  this.update = update
  this.weapon = weapon
  this.destroy = destroy
  this.x = x
  this.y = y
  this.hitboxWidth = 80
  this.width = 100
  this.height = 100
}
