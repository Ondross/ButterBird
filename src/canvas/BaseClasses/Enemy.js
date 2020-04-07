import Util from "../Util/Util"
import {astar} from "../Util/Astar"

export default function Enemy(x, y, images, sounds) {  
  const speed = .05 // px / frame
  this.destroyed = false
  const width = 1
  const height = 1
  this.facing = 'down'

  const destroy = () => {
    this.destroyed = true
    const sound = sounds[Math.floor(Math.random() * sounds.length) ]
    sound.currentTime = 0
    sound.play()
  }

  const update = (ctx, hero, gametime, walls, worldGraph) => {
    if (this.destroyed) {
      return
    }

    const xGridLocation = Math.floor(x)
    const yGridLocation = Math.floor(y)
    const heroXGridLocation = Math.floor(hero.x())
    const heroYGridLocation = Math.floor(hero.y())
    var start = worldGraph.grid[xGridLocation][yGridLocation]
    var end = worldGraph.grid[heroXGridLocation][heroYGridLocation]
    var result = astar.search(worldGraph, start, end)
  
    if (result.length) {
      let dx = result[0].x -  (x - .5)
      let dy = result[0].y - (y - .5)

      let xVel = dx ? speed * dx / Math.abs(dx) : 0
      let yVel = dy ? speed * dy / Math.abs(dy) : 0
      
      if (xVel && yVel) {
        xVel *= .71
        yVel *= .71
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
        const newVals = Util.tryUpdatingPosition(walls, this, newX, newY)

        // Round to an even number so we don't wiggle around when we're doing a-star.
        x = newVals[0]
        y = newVals[1]
      }


      // // for debugging a-star
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(result[0].x * 32, result[0].y * 32, 32, 32);
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
}
