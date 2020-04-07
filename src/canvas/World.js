import Canvas from './Canvas'
import Hero from "./Hero"
import Enemy from "./Enemy"
import Wall from './Wall';
import { Graph } from "./Util/Astar"


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
  const hero = new Hero(400, 500, keysDown)
  const enemies = [
    new Enemy(400, 100, hero),
    // new Enemy(100, 200, hero),
    // new Enemy(100, 600, hero),
    // new Enemy(100, 900, hero),
    // new Enemy(100, 1200, hero),
    // new Enemy(100, -500, hero),
    // new Enemy(100, -800, hero),
    // new Enemy(800, 100, hero),
    // new Enemy(800, 600, hero),
    // new Enemy(800, 900, hero),
    // new Enemy(800, 1200, hero),
    // new Enemy(800, 1300, hero),
  ]

  // each grid cell represents 32px.
  // the world is 800*800, or 25*25
  // unfortunately this is rotated 90deg.
  const worldGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  const worldGraph = new Graph(worldGrid, { diagonal: true })

  const walls = []
  worldGrid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        walls.push(new Wall("/images/walls/wood/vertical.png", 32 * i + 16, 32 * j + 16, 32, 32))
      }
    })
  })

  function findCollisions() {
    // Enemies need to check for other enemies (todo), and the hero
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
    })

    // Each bullet finds enemies and walls
    hero.weapon && hero.weapon.bullets.forEach(b => {
      if (b.destroyed) {
        return
      }
      enemies.forEach(e => {
        if (e.destroyed) {
          return
        }
        const xOverlap = Math.abs(b.x() - e.x()) < e.width() / 2 + b.width() / 2
        const yOverlap =
          Math.abs(b.y() - e.y()) < e.height() / 2 + b.height() / 2

        if (xOverlap && yOverlap) {
          e.destroy()
          b.destroy()
        }
      })
      walls.forEach(w => {
        const xOverlap = Math.abs(b.x() - w.x()) < w.width() / 2 + b.width() / 2
        const yOverlap =
          Math.abs(b.y() - w.y()) < w.height() / 2 + b.height() / 2

        if (xOverlap && yOverlap) {
          b.destroy()
        }
      })
    })

  }

  function update(delta) {
    gametime += delta / 1000
    canvas.clear()
    canvas.ctx.drawImage(background, 0, 0, worldWidth, worldHeight)
    hero.update(canvas.ctx, gametime, walls)
    enemies.forEach(enemy => enemy.update(canvas.ctx, gametime, walls, worldGraph))
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