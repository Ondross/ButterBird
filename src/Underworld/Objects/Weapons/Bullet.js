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

export default function Bullet(initialX, initialY, xDir, yDir) {
  let x = initialX
  let y = initialY
  let width = .7
  let height = .7
  this.destroyed = false
  let speed = .2

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
    const sound = sounds[Math.floor(Math.random() * sounds.length)]
    sound.currentTime = 0
    sound.play()
    this.destroyed = true
  }

  const sound = sounds[Math.floor(Math.random() * sounds.length)]
  sound.currentTime = 0
  sound.play()

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
