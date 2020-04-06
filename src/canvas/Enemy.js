import Util from "./Util/Util"

export default function Enemy(x, y, hero) {  
  const speed = 1.2 // px / frame
  this.destroyed = false
  const width = 35
  const height = 35

  const imageObj = new Image()
  imageObj.src = "/images/blobBoy.png"

  const destroy = () => {
    this.destroyed = true
    const sounds = document.getElementsByClassName("ow")
    const sound = sounds[Math.floor(Math.random() * sounds.length) ]
    sound.currentTime = 0
    sound.play()
  }

  const update = (ctx, gametime, walls) => {
    if (this.destroyed) {
      return
    }
    const dx = hero.x() - x
    const dy = hero.y() - y
    const distance = Math.sqrt(dx**2 + dy**2)
    const xVel = dx * speed / distance
    const yVel = dy * speed / distance

    if (xVel || yVel) {
      const newX = x + xVel
      const newY = y + yVel
      const newVals = Util.tryUpdatingPosition(walls, this, newX, newY)
      x = newVals[0]
      y = newVals[1]
    }


    ctx.drawImage(imageObj, x - width / 2, y - height / 2, width, height)
  }

  this.update = update
  this.x = () => x
  this.y = () => y
  this.width = () => width
  this.height = () => height
  this.destroy = destroy
}
