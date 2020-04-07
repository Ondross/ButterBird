const images = [
  "/images/bullet/bubble/1.png",
  "/images/bullet/bubble/2.png"
].map(src => {
  const imageObj = new Image()
  imageObj.src = src
  return imageObj
})

const poppedImages = [
  "/images/bullet/bubble/popped.png"
].map(src => {
  const imageObj = new Image()
  imageObj.src = src
  return imageObj
})

export default function Bullet(initialX, initialY, xDir, yDir) {
  let x = initialX
  let y = initialY
  let width = 1
  let height = 1
  this.destroyed = false
  let speed = .8

  // Only for 45 deg bullets
  // if (xDir && yDir) {
  //   speed = .71 * speed
  // }
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
    if (this.popped) {
      return
    }
    let image = images[Math.floor(Math.random() * images.length)]
    if (this.destroyed) {
      image = poppedImages[0]
      this.popped = true
    }
    x += xVel
    y += yVel
    ctx.drawImage(
      image,
      (x - width / 2) * window.GRIDSCALE,
      (y - height / 2) * window.GRIDSCALE,
      width * window.GRIDSCALE,
      height * window.GRIDSCALE
    )
  }

  this.width = () => width
  this.height = () => height
  this.x = () => x
  this.y = () => y
  this.update = update
  this.destroy = destroy
}
