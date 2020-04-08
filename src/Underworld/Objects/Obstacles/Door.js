

export default function Door(src, x, y, width, height, nextRoom, whichWall) {
  const image = new Image()
  image.src = src
  this.locked = true

  const update = (ctx) => {
    // unlocked doors are invisible.
    if (!this.locked) {
      return
    }
    ctx.drawImage(
      image,
      (x - width / 2),
      (y - height / 2),
      width,
      height,
    )
  }

  this.x = () => x
  this.y = () => y
  this.whichWall = whichWall
  this.width = () => width
  this.height = () => height
  this.update = update
  this.nextRoom = nextRoom
  this.lock = (lock) => {
    this.locked = lock
  }
}
