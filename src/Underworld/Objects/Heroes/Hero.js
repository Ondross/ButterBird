import Weapon from "../Weapons/Weapon"
import Util from "../../Util/Util"

export default function Hero(images, sounds, baseStats) {  
  this.speed = baseStats.speed // units / sec
  this.attack = baseStats.attack
  this.health = baseStats.health
  this.range = baseStats.range
  const weapon = new Weapon(this)
  const width = 2.5
  const height = 2.5
  this.destroyed = false
  this.facing = 'down'
  this.images = images
  let x = 0
  let y = 0

  const destroy = () => {
    if (this.destroyed === false) {
      sounds[0].currentTime = 0
      sounds[0].play()
    }
    this.destroyed = true
  }

  let invincible = false
  const damage = () => {
    if (invincible) {
      return
    }
    this.health -= 1
    if (this.health <= 0) {
      destroy()
    }
  }

  let blinkStart
  const init = () => {
    blinkStart = -999
    weapon.init()
    invincibleTimeout = -Infinity
  }

  const drawSelf = (gametime, canvas, xv, yv) => {
    let imageIndex

    // wiggle while moving.
    if (xv || yv || this.isNpc) {
      imageIndex = Math.floor(gametime * 8) % images[this.facing].length
    } else {
      imageIndex = 0
    }

    // blink every now and then
    let image
    let blinkLength = .2
    let timeSinceBlink = gametime - blinkStart
    let blinking = timeSinceBlink < blinkLength
    if (Math.random() > .99 && !blinking) {
      blinkStart = gametime
      blinking = true
      timeSinceBlink = 0
    }
    if (this.facing === 'down' && blinking) {
      image = images['blink'][
        Math.floor(timeSinceBlink / (blinkLength / images['blink'].length))
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

  let invincibleTimeout = -Infinity
  const setInvincible = (startTime, duration) => {
    invincibleTimeout = startTime + duration
  }

  const update = (gametime, dt, paused, canvas, keysDown, obstacles) => {
    if (this.destroyed) {
      return
    }
    invincible = gametime < invincibleTimeout

    if (paused || (this.isNpc && !this.recruited)) {
      weapon.update(gametime, dt, paused, canvas, this.isNpc ? [] : keysDown || [], 0, 0)

      // don't draw the hero if this is the opening cutscene.
      if (gametime > .1) {
        drawSelf(gametime, canvas, 0, 0)
      }
      return
    }
    let xVel = 0
    let yVel = 0
    keysDown.forEach((key) => {
      switch (key) {
        case ('w'):
          yVel = this.speed * -1
          this.facing = 'up'
          return
        case ('s'):
          yVel = this.speed
          this.facing = 'down'
          return
        case ('a'):
          xVel = this.speed * -1
          this.facing = 'left'
          return
        case ('d'):
          xVel = this.speed
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

    weapon.update(gametime, dt, paused, canvas, keysDown, xVel, yVel)
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
      y = doorOffset
      x = door.nextRoom.width / 2
    } else if (door.whichWall === 'N') {
      y = door.nextRoom.height - doorOffset
      x = door.nextRoom.width / 2
    }
    this.weapon.clearBullets()
  }

  this.x = () => x
  this.y = () => y
  this.setPos = (newX, newY) => {x = newX; y = newY;}
  this.enterDoor = enterDoor
  this.update = update
  this.init = init
  this.weapon = weapon
  this.destroy = destroy
  this.damage = damage
  this.hitboxWidthOffset = width / 4
  this.width = () => width
  this.height = () => height
  this.setInvincible = setInvincible
  this.setNpc = (npc) => {
    this.isNpc = npc
  }
}
