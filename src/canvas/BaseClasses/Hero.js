import Weapon from "./Weapon"
import Util from "../Util/Util"



export default function Hero(x, y, images, sounds) {  
  const speed = .1 // px / frame
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

  const update = (ctx, keysDown, gametime, obstacles) => {
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

    if (xVel || yVel) {
      const newX = x + xVel
      const newY = y + yVel
      const newVals = Util.tryUpdatingPosition(obstacles, this, newX, newY)
      x = newVals[0]
      y = newVals[1]
    }

    weapon.update(ctx, keysDown, gametime, xVel, yVel)

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
      (x - width / 2) * window.GRIDSCALE,
      (y - height / 2) * window.GRIDSCALE,
      width * window.GRIDSCALE,
      height * window.GRIDSCALE
    )
  }

  const enterDoor = (door) => {
    if (door.whichWall === 'E') {
      x = window.GAMEWIDTH / 2 - door.nextRoom.width / 2 + 3
      y = window.GAMEHEIGHT / 2
    } else if (door.whichWall === 'W') {
      x = window.GAMEWIDTH / 2 + door.nextRoom.width / 2 - 3
      y = window.GAMEHEIGHT / 2
    } else if (door.whichWall === 'S') {
      y = window.GAMEHEIGHT / 2 + door.nextRoom.height / 2 - 3
      x = window.GAMEWIDTH / 2
    } else if (door.whichWall === 'N') {
      y = window.GAMEHEIGHT / 2 + door.nextRoom.height / 2 + 3
      x = window.GAMEWIDTH / 2
    }
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
