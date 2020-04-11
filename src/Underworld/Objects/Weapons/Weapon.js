import Bullet from "./Bullet"

export default function Weapon(char) {
  const bullets = []
  const fireRate = 2 // bullets per second
  let lastFire = -Infinity

  const init = () => {
    lastFire = -Infinity
  }
  const drawSelf = (dt, paused, canvas) => {
    bullets.forEach(b => b.update(dt, paused, canvas))
  }
  const update = (dt, paused, canvas, keysDown, gametime, charXVel, charYVel) => {

    if (paused) {
      drawSelf(dt, true, canvas)
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
    drawSelf(dt, false, canvas)
  }

  this.update = update
  this.init = init
  this.bullets = () => bullets
  this.clearBullets = () => {
    bullets.splice(0)
  }
}
