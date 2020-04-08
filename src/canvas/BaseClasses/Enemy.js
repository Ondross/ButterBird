import Util from "../Util/Util"
import {astar} from "../Util/Astar"

export default function Enemy(x, y, images, sounds) {  
  const speed = .05 // px / frame
  this.destroyed = false
  const baseWidth = 1
  const baseHeight = 1
  let width = 1
  let height = 1
  let health = 1
  this.facing = 'down'


  const destroy = () => {
    this.destroyed = true
    const sound = sounds[Math.floor(Math.random() * sounds.length) ]
    sound.currentTime = 0
    sound.play()
  }
  const damage = (val) => {
    health -= val
    width = Math.log(health + 1) * baseWidth
    height = Math.log(health + 1) * baseHeight
    if (health <= 0) {
      destroy()
    }
  }

  let lastRoomId = null
  let sameRoomCounter = 0
  const update = (ctx, hero, gametime, obstacles, worldGraph, roomId) => {
    if (this.destroyed) {
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
      const heroXGridLocation = Math.floor(hero.x())
      const heroYGridLocation = Math.floor(hero.y())
      const start = worldGraph.grid[xGridLocation][yGridLocation]
      const end = worldGraph.grid[heroXGridLocation][heroYGridLocation]
      
      let result = []
      try {
        result = astar.search(worldGraph, start, end)
      } catch (e) {
        console.error(e)
        console.log(start, end, worldGraph.grid)
        console.log(xGridLocation, yGridLocation)
        debugger
      }
      if (!result.length) {
      //  console.log(start, end)
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
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(result[0].x * window.GRIDSCALE, result[0].y * window.GRIDSCALE, window.GRIDSCALE, window.GRIDSCALE);
      }

    }

    const imageIndex = Math.floor(gametime * 10) % images[this.facing].length
    const image = images[this.facing][imageIndex]
    ctx.drawImage(
      image,
      (x - width / 2) * window.GRIDSCALE,
      (y - height / 2) * window.GRIDSCALE,
      width * window.GRIDSCALE,
      height * window.GRIDSCALE
    )
  }

  this.update = update
  this.x = () => x
  this.y = () => y
  this.width = () => width
  this.height = () => height
  this.destroy = destroy
  this.damage = damage
}
