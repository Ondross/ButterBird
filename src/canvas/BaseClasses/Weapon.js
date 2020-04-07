import Bullet from "./Bullet"


const sounds = [
  "/sounds/pow/1.m4a",
  "/sounds/pow/3.m4a",
  "/sounds/pow/4.m4a",
  "/sounds/pow/5.m4a",
  "/sounds/pow/7.m4a",
  "/sounds/pow/8.m4a",
  "/sounds/pow/9.m4a",
].map(src => {
  const sound = new Audio()
  sound.src = src
  return sound
})

export default function Weapon(char) {
  const bullets = []
  const fireRate = 5 // bullets per second
  let lastFire = Infinity * -1

  const update = (ctx, keysDown, gametime, charXVel, charYVel) => {
    let xDir = 0
    let yDir = 0
    keysDown.forEach((key) => {
      // this weapon only allows 90deg shots (must earn the upgrade)
      switch(key) {
        case('ArrowUp'):
          yDir = -1
          xDir = 0
          return
        case ('ArrowDown'):
          yDir = 1
          xDir = 0
          return
        case ('ArrowLeft'):
          xDir = -1
          yDir = 0
          return
        case ('ArrowRight'):
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
      const sound = sounds[Math.floor(Math.random() * sounds.length)]
      sound.currentTime = 0
      sound.play()
      lastFire = gametime
    }

    bullets.forEach(b => b.update(ctx))
  }

  this.update = update
  this.bullets = bullets
}
