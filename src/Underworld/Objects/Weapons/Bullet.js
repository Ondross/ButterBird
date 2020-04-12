const images = [
  "/images/weapons/bullet/bubble/1.png",
  "/images/weapons/bullet/bubble/2.png"
].map(src => {
  const imageObj = new Image()
  imageObj.src = src
  return imageObj
})

const poppedImages = [
  "/images/weapons/bullet/bubble/popped.png"
].map(src => {
  const imageObj = new Image()
  imageObj.src = src
  return imageObj
})

const sounds = [
  "/sounds/pow/1.m4a",
  "/sounds/pow/3.m4a",
  "/sounds/pow/4.m4a",
  "/sounds/pow/5.m4a",
  "/sounds/pow/7.m4a",
  "/sounds/pow/8.m4a",
  "/sounds/pow/9.m4a",
].map(src => {
  const sound = new Audio()
  sound.src = src
  return sound
})

export default function Bullet(range, initialX, initialY, xDir, yDir) {
  let x = initialX
  let y = initialY
  let width = 7 / range
  let height = 7 / range
  this.destroyed = false
  let speed = 15

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
    if (this.destroyed) {
      return
    }
    const sound = sounds[Math.floor(Math.random() * sounds.length)]
    sound.currentTime = 0
    sound.play()
    this.destroyed = 1
  }

  const sound = sounds[Math.floor(Math.random() * sounds.length)]
  sound.currentTime = 0
  sound.play()

  const distance = (a, b) => Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2)

  const update = (dt, paused, canvas) => {
    if (this.popped) {
      return
    }
    if (!paused && !this.destroyed) {
      x += xVel * dt
      y += yVel * dt
    }
    if (distance({x: x, y: y}, {x: initialX, y: initialY}) > range) {
      destroy()
    }

    let image = images[Math.floor(Math.random() * images.length)]

    // todo: use gametime instead of a counter
    if (this.destroyed && this.destroyed < 5) {
      image = poppedImages[0]
      this.destroyed++
    } else if (this.destroyed) {
      this.popped = true
    }
    canvas.drawImage(
      image,
      (x - width / 2),
      (y - height / 2),
      width,
      height,
    )
  }

  this.width = () => width
  this.height = () => height
  this.x = () => x
  this.y = () => y
  this.update = update
  this.destroy = destroy
}
