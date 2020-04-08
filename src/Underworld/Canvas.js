export default function Canvas(canvasElement, game) {
  const ctx = canvasElement.getContext('2d')

  function clear() {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  }

  function drawImage(image, x, y, width, height) {
    const xOffset = (window.CANVASWIDTH - game.getLevel().currentRoom.width) / 2
    const yOffset = (window.CANVASHEIGHT - game.getLevel().currentRoom.height) / 2
    ctx.drawImage(
      image,
      (x + xOffset) * window.GRIDSCALE,
      (y + yOffset) * window.GRIDSCALE,
      width * window.GRIDSCALE,
      height * window.GRIDSCALE,
    )
  }

  this.clear = clear
  this.drawImage = drawImage
  this.ctx = ctx // for debugging only
}
