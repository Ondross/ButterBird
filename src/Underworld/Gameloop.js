import Canvas from './Canvas'
import LevelBuilder from './LevelGenerators/LevelBuilder'
import Squid from "./Objects/Heroes/Squid"
import Util from "./Util/Util"

export default function World() {
  let gametime = 0 // seconds
  let gameEvents = {}
  let hero, level, canvas
  const levelBuilder = new LevelBuilder()

  const keysDown = [] // ordered array: oldest to newest events
  document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase()
    const index = keysDown.indexOf(key)
    if (index === -1) keysDown.push(key)
  })
  document.addEventListener("keyup", e => {
    const key = e.key.toLowerCase()
    const index = keysDown.indexOf(key)
    if (index !== -1) keysDown.splice(index, 1)
  })


  let alreadyInDoorway = false
  function findAllCollisions() {
    const room = level.currentRoom

    // Enemies x Hero
    room.enemies.forEach(e => {
      if (e.destroyed) {
        return
      }
      if (!hero.destroyed) {
        if (Util.checkForOverlap(e, hero)) {
          hero.destroy()
        }
      }
    })

    // Bullets x enemies, doors, and walls
    let enemyDestroyed = false
    hero.weapon && hero.weapon.bullets().forEach(b => {
      if (b.destroyed) {
        return
      }
      room.enemies.forEach(e => {
        if (e.destroyed) {
          return
        }

        if (Util.checkForOverlap(b, e)) {
          enemyDestroyed = e.damage(.4)
          b.destroy()
        }
      })
      level.currentRoom.walls.concat(Object.values(level.currentRoom.doors)).forEach(w => {
        if (Util.checkForOverlap(b, w)) {
          b.destroy()
        }
      })
    })

    // stop tracking dead enemies
    if (enemyDestroyed) {
      room.enemies = room.enemies.filter(e => !e.destroyed)
      gameEvents.enemyDestroyed = true
    }

    // Doors x Hero
    let enteredDoorway = false
    Object.values(level.currentRoom.doors).forEach(door => {
      if (door.locked) {
        return
      }
      if (Util.checkForOverlap(hero, door)) {
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

  let paused = false
  let lastUpdate
  function update() {
    if (!canvas || !level) {
      return
    }
    if (hero.destroyed) {
      gameEvents.dead = true
    }
    const room = level.currentRoom
    if (room.enemies.length === 0) {
      Object.values(room.doors).forEach(door => {
        door.locked = false
      })
    }

    const now = Date.now()
    const delta = (now - lastUpdate) / 1000
    lastUpdate = now
    gametime += delta
    canvas.clear()

    canvas.drawImage(
      level.currentRoom.backgroundImage,
      0,
      0,
      level.currentRoom.width,
      level.currentRoom.height,
      true
    )
    hero.update(delta, paused, canvas, keysDown, gametime, room.walls.concat(Object.values(room.doors)))
    room.enemies.forEach(enemy =>
      enemy.update(delta, paused, canvas, hero, gametime, room.walls.concat(room.enemies), room.graph, room.id)
    )
    room.walls.forEach(wall => wall.update(canvas))
    Object.values(room.doors).forEach(door => door.update(canvas))

    findAllCollisions()
  }

  function getState() {
    const state = {
      events: Object.assign({}, gameEvents),
      heroes: [hero],
      level: level
    }
    gameEvents = {}
    return state
  }

  const newLevel = (levelParameters) => {
    gametime = 0
    lastUpdate = Date.now()
    level = levelBuilder.build(levelParameters, window.CANVASWIDTH, window.CANVASHEIGHT)
    hero = Squid(3, window.CANVASHEIGHT / 2) // make this an argument too.
  }

  this.update = update
  this.getState = getState
  this.getLevel = () => level
  this.newLevel = newLevel
  this.setCanvas = (canvasElement) => {
    canvas = new Canvas(canvasElement, this)
  }
  this.setScale = (scale) => {
    canvas && canvas.setScale(scale)
  }
  this.pause = (pause) => {
    paused = pause
  }
}