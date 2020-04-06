import Canvas from './Canvas'
import Hero from "./Hero"
import Enemy from "./Enemy"
import Wall from './Wall';

const background = new Image()
background.src = '/images/backgrounds/space.jpg'

export default function World(canvasElement, worldWidth, worldHeight) {
  const canvas = new Canvas(canvasElement)
  let gametime = 0 // seconds

  const keysDown = [] // ordered array: most recent click wins

  document.addEventListener("keydown", e => {
    const index = keysDown.indexOf(e.key)
    if (index === -1) keysDown.push(e.key)
  })
  document.addEventListener("keyup", e => {
    // this is fine because the array is probably not more than length 5.
    const index = keysDown.indexOf(e.key)
    if (index !== -1) keysDown.splice(index, 1)
  })

  // test code
  const hero = new Hero(400, 400, keysDown)
  const enemies = [
    new Enemy(100, 100, hero),
    new Enemy(100, 200, hero),
    new Enemy(100, 600, hero),
    new Enemy(100, 900, hero),
    new Enemy(100, 1200, hero),
    new Enemy(100, -500, hero),
    new Enemy(100, -800, hero),
    new Enemy(800, 100, hero),
    new Enemy(800, 600, hero),
    new Enemy(800, 900, hero),
    new Enemy(800, 1200, hero),
    new Enemy(800, 1300, hero),
  ]
  const walls = [
    new Wall("/images/walls/wood/verticalTopLeft.png", 8, 50, 16, 100),
    new Wall("/images/walls/wood/vertical.png", 8, 150, 16, 100),
    new Wall("/images/walls/wood/vertical.png", 8, 250, 16, 100),
    new Wall("/images/walls/wood/vertical.png", 8, 350, 16, 100),
    new Wall("/images/walls/wood/vertical.png", worldWidth - 8, 150, 16, 100),
    new Wall("/images/walls/wood/vertical.png", worldWidth - 8, 250, 16, 100),
    new Wall("/images/walls/wood/vertical.png", worldWidth - 8, 350, 16, 100),
    new Wall("/images/walls/wood/horizontalTopLeft.png", 50, 8, 100, 16),
    new Wall("/images/walls/wood/horizontalTopLeft.png", 300, 400, 100, 16)
  ]

  function findCollisions() {
    // Enemies need to check for hero bullets, other enemies (todo), and the hero
    enemies.forEach(e => {
      if (e.destroyed) {
        return
      }
      if (!hero.destroyed) {
        const xOverlap =
          Math.abs(e.x() - hero.x()) < hero.width() / 2 + e.width() / 2
        const yOverlap =
          Math.abs(e.y() - hero.y()) < hero.height() / 2 + e.height() / 2
        if (xOverlap && yOverlap) {
          hero.destroy()
        }
      }

      hero.weapon && hero.weapon.bullets.forEach(b => {
        if (b.destroyed) {
          return
        }
        const xOverlap = Math.abs(b.x() - e.x()) < (e.width() / 2 + b.width() / 2)
        const yOverlap = Math.abs(b.y() - e.y()) < (e.height() / 2 + b.height() / 2)

        if (xOverlap && yOverlap) {
          e.destroy()
          b.destroy()
        }
      })
    })

    // We check for wall collisions as we move, in the character code.
  }

  function update(delta) {
    gametime += delta / 1000
    canvas.clear()
    canvas.ctx.drawImage(background, 0, 0, worldWidth, worldHeight)
    hero.update(canvas.ctx, gametime, walls)
    enemies.forEach(enemy => enemy.update(canvas.ctx, gametime, walls))
    walls.forEach(wall => wall.update(canvas.ctx))

    findCollisions()
  }

  function getState() {
    return {
      heroes: [hero]
    }
  }

  this.update = update
  this.getState = getState
}