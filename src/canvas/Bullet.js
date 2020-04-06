const images = [
  "/images/bullet/bubble/1.png",
  "/images/bullet/bubble/2.png"
].map(src => {
  const imageObj = new Image()
  imageObj.src = src
  return imageObj
})

export default function Bullet(initialX, initialY, xDir, yDir) {
  let x = initialX
  let y = initialY
  let width = 32
  let height = 32
  this.destroyed = false
  let speed = 12
  if (xDir && yDir) {
    speed = .71 * speed
  }
  if (!xDir && !yDir) {
    console.error('floating bullet')
    xDir = 1
  }
  const xVel = speed * xDir
  const yVel = speed * yDir

  const destroy = () => {
    this.destroyed = true
  }

  const update = (ctx) => {
    if (this.destroyed) {
      return
    }
    x += xVel
    y += yVel
    ctx.drawImage(
      images[
      Math.floor(Math.random() * 10) % images.length
      ],
      x - width / 2,
      y - height / 2,
      width,
      height
    )
  }

  this.width = () => width
  this.height = () => height
  this.x = () => x
  this.y = () => y
  this.update = update
  this.destroy = destroy
}
