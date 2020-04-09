export default function Canvas(canvasElement, game) {
  const ctx = canvasElement.getContext('2d')

  const updateWidth = (windowWidth) => {
    gridScale = windowWidth / window.CANVASWIDTH
  }

  let gridScale
  updateWidth(window.innerWidth)
  window.addEventListener('resize', e => updateWidth(e.target.innerWidth))

  const clear = () => {
    canvasElement.width = window.CANVASWIDTH * gridScale
    canvasElement.height = window.CANVASHEIGHT * gridScale

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)
  }

  const drawImage = (image, x, y, width, height) => {
    const xOffset = (window.CANVASWIDTH - game.getLevel().currentRoom.width) / 2
    const yOffset = (window.CANVASHEIGHT - game.getLevel().currentRoom.height) / 2

    ctx.drawImage(
      image,
      (x + xOffset) * gridScale,
      (y + yOffset) * gridScale,
      width * gridScale,
      height * gridScale,
    )
  }

  this.clear = clear
  this.drawImage = drawImage
  this.ctx = ctx // for debugging only
}
