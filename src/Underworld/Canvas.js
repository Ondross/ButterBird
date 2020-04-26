export default function Canvas(canvasElement, game) {
  const ctx = canvasElement.getContext('2d')

  const updateDimensions = (windowWidth, windowHeight) => {
    gridScale = Math.min(windowWidth / window.CANVASWIDTH, windowHeight / window.CANVASHEIGHT)
  }

  let gridScale
  updateDimensions(window.innerWidth, window.innerHeight)
  window.addEventListener('resize', e => updateDimensions(e.target.innerWidth, e.target.innerHeight))

  const clear = () => {
    canvasElement.width = window.CANVASWIDTH * gridScale
    canvasElement.height = window.CANVASHEIGHT * gridScale

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)
  }

  const drawImage = (image, x, y, width, height, preserveAspectRatio) => {

    try {
      const xOffset = (window.CANVASWIDTH - game.getLevel().currentRoom.width) / 2
      const yOffset = (window.CANVASHEIGHT - game.getLevel().currentRoom.height) / 2

      let ogImageWidth = image.width
      let ogImageHeight = image.height
      if (preserveAspectRatio) {
        if (ogImageWidth / ogImageHeight > width / height) {
          ogImageWidth = width * ogImageHeight / height
        } else {
          ogImageHeight = height * ogImageWidth / width
        }
      }
      ctx.drawImage(
        image,
        0, 0,
        ogImageWidth,
        ogImageHeight,
        (x + xOffset) * gridScale,
        (y + yOffset) * gridScale,
        width * gridScale,
        height * gridScale,
      )
    } catch (e) {
      // better to just not draw something than crash.
      console.error('failed to draw', e)
    }
  }

  // For debugging
  const drawRect = (x, y, width, height) => {
    const xOffset = (window.CANVASWIDTH - game.getLevel().currentRoom.width) / 2
    const yOffset = (window.CANVASHEIGHT - game.getLevel().currentRoom.height) / 2

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(
      (x + xOffset) * gridScale,
      (y + yOffset) * gridScale,
      width * gridScale,
      height * gridScale)
  }

  this.clear = clear
  this.drawImage = drawImage
  this.drawRect = drawRect
}
