import Util from "../../Util/Util"
import {astar, Graph} from "../../Util/Astar"

export default function Enemy(x, y, images, sounds) {  
  const speed = 4 // px / frame
  this.destroyed = false
  const baseWidth = 2
  const baseHeight = 2
  let width = 2
  let height = 2
  let health = 2
  this.facing = 'down'

  const destroy = () => {
    this.destroyed = true
    const sound = sounds[Math.floor(Math.random() * sounds.length) ]
    sound.currentTime = 0
    sound.play()
  }
  const damage = (val) => {
    health -= val
    width = baseWidth * (health / 2) * .5 + .5
    height = baseHeight * (health / 2) * .5 + .5

    if (health <= 0) {
      destroy()
      return true
    } else {
      // We're smaller and can get through smaller passageways now.
      updateRoomGrid(roomGrid)
    }
  }

  const drawSelf = (canvas, gametime) => {
    const imageIndex = Math.floor(gametime * 8) % images[this.facing].length
    const image = images[this.facing][imageIndex]
    canvas.drawImage(
      image,
      (x - width / 2),
      (y - height / 2),
      width,
      height
    )
  }

  let lastRoomId = null
  let sameRoomCounter = 0
  const update = (gametime, dt, paused, canvas, hero, obstacles, roomId) => {
    if (this.destroyed) {
      return
    }
    if (paused) {
      drawSelf(canvas, gametime)
      return
    }

    // pause for a few cycles when the hero first enters the room.
    if (roomId !== lastRoomId) {
      sameRoomCounter = 0
    }
    lastRoomId = roomId
    sameRoomCounter++

    if (sameRoomCounter > window.FPS / 2) {
      const xGridLocation = Math.floor(x)
      const yGridLocation = Math.floor(y)
      const start = modifiedRoomGraph.grid[xGridLocation][yGridLocation]

      // If the hero is against a wall, and we're larger than her,
      // a-star will rightly tell us there is no path.
      // Attacking the hero's corners won't work, because we don't know which corner
      // is up against a wall.

      // That said, the hero still has a trick: she can be on non-integer locations.
      // To solve this, we give walls a high, but not infinite weight, and hope that the path
      // planner never tries to send enemies through them.

      const heroXGridLocation = Math.round(hero.x())
      const heroYGridLocation = Math.round(hero.y())

      const end = modifiedRoomGraph.grid[heroXGridLocation][heroYGridLocation]
      
      let result = []
      try {
        result = astar.search(modifiedRoomGraph, start, end)
      } catch (e) {
        console.error(e)
        console.log(start, end, modifiedRoomGraph.grid)
        console.log(xGridLocation, yGridLocation)
      }
    
      if (result.length) {
        let dx = result[0].x -  (x - .5)
        let dy = result[0].y - (y - .5)

        let xVel = dx ? speed * dx / Math.abs(dx) : 0
        let yVel = dy ? speed * dy / Math.abs(dy) : 0
        
        if (xVel && yVel) {
          xVel *= .71
          yVel *= .71
        }
        xVel *= dt
        yVel *= dt
        if (xVel > yVel) {
          if (xVel > 0) {
            this.facing = 'right'
          } else {
            this.facing = 'left'
          }
        } else if (yVel > xVel) {
          if (yVel > 0) {
            this.facing = 'down'
          } else {
            this.facing = 'up'
          }
        }

        if (Math.abs(dx) < .01 && dx !== 0) {
          xVel = dx
        }
        if (Math.abs(dy) < .01 && dy !== 0) {
          yVel = dy
        }

        if (xVel || yVel) {
          const newX = x + xVel
          const newY = y + yVel
          const newVals = Util.tryUpdatingPosition(obstacles, this, newX, newY)

          // Round to an even number so we don't wiggle around when we're doing a-star.
          x = newVals[0]
          y = newVals[1]
        }

        // // for debugging a-star
        // console.log(result[0].x, result[0].y, modifiedRoomGraph.grid[result[0].x][result[0].y])
        // canvas.drawRect(result[0].x, result[0].y, 1, 1)
      }
    }
    drawSelf(canvas, gametime)
  }


  // For a-star to work, this needs to be called when the room is initialized,
  // as well as anytime walls are created or destroyed
  let modifiedRoomGraph
  let roomGrid
  const updateRoomGrid = (roomGridInfo) => {
    roomGrid = roomGridInfo
    const roomGridCopy = JSON.parse(JSON.stringify(roomGrid))
    // For each cell, determine if we can fit in the space, assuming we are centered on that cell.
    // Each wall is a -1. Each free space is a 1. We essentially need to inflate the walls a little,
    // if this enemy is larger than a single cell.

    // For every 2 cells over 1 that the enemy takes up, we need to look 1 cell further out.
    // Multiplying by -1 ensures that Math.round rounds .5 down.
    // So if the enemy is 1.0 tall, we don't expand the walls at all. But if the enemy is 1.1 tall
    // it cannot occupy squares that are adjacent to walls.
    const heightDistanceToCheck = -1 * Math.round(-1 * height / 2)
    const widthDistanceToCheck = -1 * Math.round(-1 * width / 2)

    roomGridCopy.forEach((col, x) => {
      col.forEach((_, y) => {

        if (roomGridCopy[x][y] === 0) {
          for (let i = (-1 * widthDistanceToCheck); i <= widthDistanceToCheck; i++) {
            for (let j = (-1 * heightDistanceToCheck); j <= heightDistanceToCheck; j++) {
              const positiveNumbers = ((x + i) >= 0) && ((y + j) >=0)
              const inRoom = ((x + i) < roomGridCopy.length) && ((y + j) < col.length)
              if (positiveNumbers && inRoom && roomGridCopy[x + i][y + j] !== 0) {
                // True walls are infinite weight.
                // 999 allows enemies to go toward areas in space near walls where they can't fit
                // but might need to chase something
                roomGridCopy[x + i][y + j] = 9999999999999
              }
            }
          }
        }
      })
    })

    modifiedRoomGraph = new Graph(roomGridCopy, { diagonal: true })
  }

  this.updateRoomGrid = updateRoomGrid
  this.update = update
  this.x = () => x
  this.y = () => y
  this.width = () => width
  this.height = () => height
  this.destroy = destroy
  this.damage = damage
}
