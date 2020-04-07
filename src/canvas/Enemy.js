import Util from "./Util/Util"
import {astar} from "./Util/Astar"




export default function Enemy(x, y, hero) {  
  const speed = 2 // px / frame
  this.destroyed = false
  const width = 32
  const height = 32

  const imageObj = new Image()
  imageObj.src = "/images/blobBoy.png"

  const destroy = () => {
    this.destroyed = true
    const sounds = document.getElementsByClassName("ow")
    const sound = sounds[Math.floor(Math.random() * sounds.length) ]
    sound.currentTime = 0
    sound.play()
  }

  const update = (ctx, gametime, walls, worldGraph) => {
    if (this.destroyed) {
      return
    }

    const xGridLocation = Math.floor(x / 32)
    const yGridLocation = Math.floor(y / 32)
    const heroXGridLocation = Math.floor(hero.x() / 32)
    const heroYGridLocation = Math.floor(hero.y() / 32)
    var start = worldGraph.grid[xGridLocation][yGridLocation]
    var end = worldGraph.grid[heroXGridLocation][heroYGridLocation]
    var result = astar.search(worldGraph, start, end)
  
    const dx = result[0].x -  ((x - 16) / 32)
    const dy = result[0].y - ((y - 16) / 32)

    let xVel = dx ? speed * dx / Math.abs(dx) : 0
    let yVel = dy ? speed * dy / Math.abs(dy) : 0

    if (xVel && yVel) {
      xVel *= .71
      yVel *= .71
    }

    if (xVel || yVel) {
      const newX = x + xVel
      const newY = y + yVel
      const newVals =   Util.tryUpdatingPosition(walls, this, newX, newY)

      // Round to an even number so we don't wiggle around when we're doing a-star.
      x = Math.round(newVals[0] / 2) * 2
      y = Math.round(newVals[1] / 2) * 2
    }

    // for debugging a-star
    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(result[0].x * 32, result[0].y * 32, 32, 32);


    ctx.drawImage(imageObj, x - width / 2, y - height / 2, width, height)
  }

  this.update = update
  this.x = () => x
  this.y = () => y
  this.width = () => width
  this.height = () => height
  this.destroy = destroy
}
