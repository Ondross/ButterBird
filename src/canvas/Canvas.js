export default function Canvas(canvasElement) {
  const ctx = canvasElement.getContext('2d')

  function clear() {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  }

  this.clear = clear
  this.ctx = ctx
}
