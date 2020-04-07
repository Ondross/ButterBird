import Canvas from './Canvas'
import LevelBuilder from './LevelGenerators/UnderworldLevelBuilder'
import Squid from "./Heroes/Squid"

const background = new Image()
background.src = '/images/backgrounds/space.jpg'

export default function World(canvasElement) {
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

  function overlaps(a, b) {
    const xOverlap =
      Math.abs(a.x() - b.x()) < b.width() / 2 + a.width() / 2
    const yOverlap =
      Math.abs(a.y() - b.y()) < b.height() / 2 + a.height() / 2
    return xOverlap && yOverlap
  }

  let alreadyInDoorway = false
  function findCollisions() {
    const room = level.currentRoom

    // Enemies x Hero
    room.enemies.forEach(e => {
      if (e.destroyed) {
        return
      }
      if (!hero.destroyed) {
        if (overlaps(e, hero)) {
          hero.destroy()
        }
      }
    })

    // Bullets x enemies and walls
    let enemyDestroyed = false
    hero.weapon && hero.weapon.bullets.forEach(b => {
      if (b.destroyed) {
        return
      }
      room.enemies.forEach(e => {
        if (e.destroyed) {
          return
        }

        if (overlaps(b, e)) {
          e.destroy()
          b.destroy()
          enemyDestroyed = true
        }
      })
      level.currentRoom.walls.forEach(w => {
        if (overlaps(b, w)) {
          b.destroy()
        }
      })
    })

    // stop tracking dead enemies
    if (enemyDestroyed) {
      room.enemies = room.enemies.filter(e => !e.destroyed)
    }

    // Doors x Hero
    let enteredDoorway = false
    Object.values(level.currentRoom.doors).forEach(door => {
      if (overlaps(hero, door)) {
        if (!alreadyInDoorway) {
          level.enterDoor(door.whichWall)
          hero.enterDoor(door)
        }
        enteredDoorway = true
        alreadyInDoorway = true
      }
    })
    alreadyInDoorway = enteredDoorway
  }

  const levelBuilder = new LevelBuilder()
  let hero, level
  function restart() {
    level = levelBuilder.build(24, 18)
    hero = Squid(10, 15)
  }

  function update(delta) {
    if (hero.destroyed) {
      restart()
    }
    const room = level.currentRoom
    if (room.enemies.length === 0) {
      console.log("NICE!")
    }

    gametime += delta / 1000
    canvas.clear()
    canvas.ctx.drawImage(
      background,
      0,
      0,
      window.GAMEWIDTH * window.GRIDSCALE,
      window.GAMEHEIGHT * window.GRIDSCALE
    )
    hero.update(canvas.ctx, keysDown, gametime, room.walls)
    room.enemies.forEach(enemy => enemy.update(canvas.ctx, hero, gametime, room.walls, room.graph))
    room.walls.forEach(wall => wall.update(canvas.ctx))
    Object.values(room.doors).forEach(door => door.update(canvas.ctx))

    findCollisions()
    
  }

  function getState() {
    return {
      heroes: [hero]
    }
  }
  
  restart()
  this.update = update
  this.getState = getState
}