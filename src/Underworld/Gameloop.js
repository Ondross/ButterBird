import Canvas from './Canvas'
import LevelBuilder from './LevelGenerators/UnderworldLevelBuilder'
import Squid from "./Objects/Heroes/Squid"
import Util from "./Util/Util"

const background = new Image()
background.src = '/images/backgrounds/space.jpg'

export default function World() {
  let canvas
  let gametime = 0 // seconds

  const keysDown = [] // ordered array: most recent click wins

  document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase()
    const index = keysDown.indexOf(key)
    if (index === -1) keysDown.push(key)
  })
  document.addEventListener("keyup", e => {
    const key = e.key.toLowerCase()
    // the performance fine because the array is probably not more than length 5.
    const index = keysDown.indexOf(key)
    if (index !== -1) keysDown.splice(index, 1)
  })


  let alreadyInDoorway = false
  function findCollisions() {
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

    // Bullets x enemies and walls
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
          e.damage(.4)
          b.destroy()
          enemyDestroyed = true
        }
      })
      level.currentRoom.walls.forEach(w => {
        if (Util.checkForOverlap(b, w)) {
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

  const levelBuilder = new LevelBuilder()
  let hero, level
  function restart() {
    level = levelBuilder.build(window.CANVASWIDTH, window.CANVASHEIGHT)
    hero = Squid(3, window.CANVASHEIGHT / 2)
  }

  let paused = false
  function update(delta) {
    if (!canvas) {
      return
    }
    if (hero.destroyed) {
      restart()
    }
    const room = level.currentRoom
    if (room.enemies.length === 0) {
      Object.values(room.doors).forEach(door => {
        door.locked = false
      })
    }

    if (level.rooms.every(room => room.enemies.length === 0 && room.visited)) {
      this.congratulations = true
    }

    gametime += delta / 1000
    canvas.clear()
    canvas.drawImage(
      background,
      0,
      0,
      level.currentRoom.width,
      level.currentRoom.height
    )
    hero.update(paused, canvas, keysDown, gametime, room.walls.concat(Object.values(room.doors)))
    room.enemies.forEach(enemy =>
      enemy.update(paused, canvas, hero, gametime, room.walls.concat(room.enemies), room.graph, room.id)
    )
    room.walls.forEach(wall => wall.update(canvas))
    Object.values(room.doors).forEach(door => door.update(canvas))

    findCollisions()
  }

  function getState() {
    return {
      heroes: [hero],
      congratulations: this.congratulations
    }
  }
  
  restart()
  this.update = update
  this.getState = getState
  this.getLevel = () => level
  this.setCanvas = (canvasElement) => {
    canvas = new Canvas(canvasElement, this)
  }
  this.pause = (pause) => {
    paused = pause
  }
}