

export default function Wall(src, x, y, width, height) {
  const image = new Image()
  image.src = src

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
  this.width = () => width
  this.height = () => height
  this.update = update
}