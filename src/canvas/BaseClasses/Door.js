

export default function Door(src, x, y, width, height, nextRoom, whichWall) {
  const image = new Image()
  image.src = src
  this.locked = false

  const update = (ctx) => {
    ctx.drawImage(
      image,
      (x - width / 2) * window.GRIDSCALE,
      (y - height / 2) * window.GRIDSCALE,
      width * window.GRIDSCALE,
      height * window.GRIDSCALE,
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
