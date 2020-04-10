import Weapon from "../Weapons/Weapon"
import Util from "../../Util/Util"



export default function Hero(x, y, images, sounds) {  
  const speed = 9 // units / sec
  const weapon = new Weapon(this)
  const width = 2.5
  const height = 2.5
  this.destroyed = false
  this.facing = 'down'

  const destroy = () => {
    if (this.destroyed === false) {
      sounds[0].currentTime = 0
      sounds[0].play()
    }
    this.destroyed = true
  }

  let blinkStart = 0
  const drawSelf = (gametime, canvas, xv, yv) => {
    let imageIndex

    // wiggle while moving.
    if (xv || yv) {
      imageIndex = Math.floor(gametime * 8) % images[this.facing].length
    } else {
      imageIndex = 0
    }

      // blink every now and then
    let image
    let blinking = gametime - blinkStart < .1
    if (Math.random() > .97 && !blinking) {
      blinkStart = gametime
      blinking = true
    }
    if (this.facing === 'down' && blinking) {
      image = images['blink'][
        Math.floor(gametime) % images['blink'].length
      ]
    } else {
      image = images[this.facing][imageIndex]
    }
    canvas.drawImage(
      image,
      (x - width / 2),
      (y - height / 2),
      width,
      height
    )
  }

  const update = (dt, paused, canvas, keysDown, gametime, obstacles) => {
    if (this.destroyed) {
      return
    }
    if (paused) {
      weapon.update(dt, paused, canvas, keysDown, gametime, 0, 0)
      drawSelf(gametime, canvas, 0, 0)
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
        default:
          return
      }
    })

    // shooting overrides movement for which way you're facing
    keysDown.forEach((key) => {
      switch (key) {
        case ('arrowdown'):
          this.facing = 'down'
          return
        case ('arrowup'):
          this.facing = 'up'
          return
        case ('arrowleft'):
          this.facing = 'left'
          return
        case ('arrowright'):
          this.facing = 'right'
          return
        default:
          return
      }
    })

    if (yVel && xVel) {
      yVel *= .71
      xVel *= 0.71
    }
    xVel *= dt
    yVel *= dt

    if (xVel || yVel) {
      const newX = x + xVel
      const newY = y + yVel
      const newVals = Util.tryUpdatingPosition(obstacles, this, newX, newY)
      x = newVals[0]
      y = newVals[1]
    }

    weapon.update(dt, paused, canvas, keysDown, gametime, xVel, yVel)
    drawSelf(gametime, canvas, xVel, yVel)
  }

  const enterDoor = (door) => {
    // don't start on the edge of the room, or you'll be inside a door.
    const doorOffset = 3
    if (door.whichWall === 'E') {
      x = doorOffset
      y = door.nextRoom.height / 2
    } else if (door.whichWall === 'W') {
      x = door.nextRoom.width - doorOffset
      y = door.nextRoom.height / 2
    } else if (door.whichWall === 'S') {
      y = door.nextRoom.height - doorOffset
      x = door.nextRoom.width / 2
    } else if (door.whichWall === 'N') {
      y = doorOffset
      x = door.nextRoom.width / 2
    }
    this.weapon.clearBullets()
  }

  this.x = () => x
  this.y = () => y
  this.enterDoor = enterDoor
  this.update = update
  this.weapon = weapon
  this.destroy = destroy
  this.hitboxWidthOffset = width / 4
  this.width = () => width
  this.height = () => height
}
