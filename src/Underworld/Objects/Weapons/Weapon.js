import Bullet from "./Bullet"

export default function Weapon(char) {
  const bullets = []
  const fireRate = 5 // bullets per second
  let lastFire = Infinity * -1

  const drawSelf = (paused, canvas) => {
    bullets.forEach(b => b.update(paused, canvas))
  }
  const update = (paused, canvas, keysDown, gametime, charXVel, charYVel) => {
    if (paused) {
      drawSelf(true, canvas)
      return
    }
    let xDir = 0
    let yDir = 0
    keysDown.forEach((key) => {
      // this weapon only allows 90deg shots (must earn the upgrade)
      switch(key) {
        case('arrowup'):
          yDir = -1
          xDir = 0
          return
        case ('arrowdown'):
          yDir = 1
          xDir = 0
          return
        case ('arrowleft'):
          xDir = -1
          yDir = 0
          return
        case ('arrowright'):
          xDir = 1
          yDir = 0
          return
        default:
          return
      }
    })
    const reloaded = (gametime - lastFire) > (1 / fireRate)
    if ((xDir || yDir) && reloaded) {
      bullets.push(new Bullet(char.x(), char.y(), xDir + charXVel * .02, yDir + charYVel * .02))
      lastFire = gametime
    }
    drawSelf(false, canvas)
  }

  this.update = update
  this.bullets = () => bullets
  this.clearBullets = () => {
    bullets.splice(0)
  }
}
