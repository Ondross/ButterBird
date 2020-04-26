import Canvas from './Canvas'
import LevelBuilder from './LevelGenerators/LevelBuilder'
import Util from "./Util/Util"

export default function World() {
  let gametime = null // seconds
  let tailgaters = [] // NPCs that follow you around.
  let gameEvents = {}
  let hero, level, canvas
  let paused = false
  let musicPlayer
  const levelBuilder = new LevelBuilder()

  const keysDown = [] // ordered array: oldest to newest events
  document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase()
    const index = keysDown.indexOf(key)
    if (index === -1) keysDown.push(key)

    if (key === 'r' && !paused) {
      rotateHeroes()
    }
  })
  document.addEventListener("keyup", e => {
    const key = e.key.toLowerCase()
    const index = keysDown.indexOf(key)
    if (index !== -1) keysDown.splice(index, 1)
  })

  let alreadyInDoorway = false
  function findAllCollisions() {
    const room = level.currentRoom

    // Bullets x enemies, doors, and walls
    let enemyDestroyed = false
    let bullets = [...hero.weapon.bullets()]
    tailgaters.forEach((tg) => {
      bullets = bullets.concat(tg.weapon.bullets())
    })
    bullets.forEach(b => {
      if (b.destroyed) {
        return
      }
      room.enemies.forEach(e => {
        if (e.destroyed) {
          return
        }

        if (Util.checkForOverlap(b, e)) {
          enemyDestroyed = e.damage(hero.attack)
          b.destroy()
        }
      })
      level.currentRoom.walls.concat(Object.values(level.currentRoom.doors)).forEach(w => {
        if (Util.checkForOverlap(b, w)) {
          b.destroy()
        }
      })
    })

    // stop tracking dead enemies (unless )
    if (enemyDestroyed && !hero.destroyed) {
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
          tailgaters.forEach(tg => tg.enterDoor(door))
        }
        enteredDoorway = true
        alreadyInDoorway = true
      }
    })

    // Enemies x Hero
    room.enemies.forEach(e => {
      if (e.destroyed) {
        return
      }
      if (!hero.destroyed) {
        if (Util.checkForOverlap(e, hero)) {
          hero.damage()
        }
      }
    })

    // NPCs x Hero
    room.npcs.forEach((npc, idx) => {
      if (npc.destroyed) {
        return
      }
      if (Util.checkForOverlap(npc, hero)) {
        gameEvents.recruitNpc = npc
        npc.recruited = true
        tailgaters.push(room.npcs.splice(idx, 1)[0])
      }
    })

    alreadyInDoorway = enteredDoorway
  }

  let lastUpdate
  function update() {
    gametime = gametime || 0
    lastUpdate = lastUpdate || Date.now()
    if (!canvas || !level) {
      return
    }
    if (hero.destroyed) {
      team.splice(heroIndex, 1)
      heroIndex = heroIndex % team.length
      if (team[heroIndex]) {
        team[heroIndex].setPos(hero.x(), hero.y())
        hero = team[heroIndex]
        hero.setInvincible(gametime, 3)
      }
      if (team.filter(hero => !hero.isNpc).length < 1) {
        gameEvents.gameOver = true
      } else {
        gameEvents.dead = true
      }
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
    if (!paused) {
      gametime += delta
    }
    canvas.clear()

    canvas.drawImage(
      level.currentRoom.backgroundImage,
      0,
      0,
      level.currentRoom.width,
      level.currentRoom.height,
      true
    )

    room.npcs.forEach(npc => npc.update(gametime, delta, paused, canvas, keysDown, []))
    tailgaters.forEach(npc => npc.update(gametime, delta, paused, canvas, keysDown, []))
    hero.update(gametime, delta, paused, canvas, keysDown, room.walls.concat(Object.values(room.doors)))
    room.enemies.forEach(enemy =>
      enemy.update(gametime, delta, paused, canvas, hero, room.walls.concat(room.enemies), room.id)
    )
    room.walls.forEach(wall => wall.update(canvas))
    Object.values(room.doors).forEach(door => door.update(canvas))

    findAllCollisions()

    // For admin only
    if (keysDown.indexOf('y') > -1 && !paused) {
      room.enemies = []
    }
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

  let heroIndex = 0
  let team = []
  const newLevel = (levelTemplate, party, difficulty) => {
    gametime = null
    lastUpdate = null
    level = levelBuilder.build(levelTemplate, window.CANVASWIDTH, window.CANVASHEIGHT, difficulty)
    hero = party[heroIndex]
    party.forEach(h => h.init())
    team = party
    hero.setPos(5, window.CANVASHEIGHT / 2)
    tailgaters = []

    if (musicPlayer) {
      musicPlayer.play('calm')
    }
  }

  const rotateHeroes = () => {
    heroIndex = (heroIndex + 1) % team.length
    team[heroIndex].setPos(hero.x(), hero.y())
    hero = team[heroIndex]
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
  this.setMusicPlayer = (player) => {
    musicPlayer = player
  }
  this.pause = (pause) => {
    paused = pause
  }
}