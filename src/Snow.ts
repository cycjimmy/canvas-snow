export interface SnowMotion {
  x: (x: number, y: number) => number
  y: (x: number, y: number) => number
}

export default class Snow {
  x: number
  y: number
  r: number
  fn: SnowMotion
  canvasW: number
  canvasH: number

  constructor(x: number, y: number, radius: number, fn: SnowMotion, canvasW: number, canvasH: number) {
    this.x = x
    this.y = y
    this.r = radius
    this.fn = fn
    this.canvasW = canvasW
    this.canvasH = canvasH
  }

  update(): void {
    if (this.y > this.canvasH) {
      this.x = Math.random() * this.canvasW
      this.y = 0
    }
    else {
      this.x = this.fn.x(this.x, this.y)
      this.y = this.fn.y(this.y, this.y)
    }
  }

  draw(cxt: CanvasRenderingContext2D): void {
    const grd = cxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r)
    grd.addColorStop(0, `rgba(255, 255, 255, ${(this.r / 6)})`)
    grd.addColorStop(0.5, `rgba(255, 255, 255, ${(this.r / 6) * 0.5})`)
    grd.addColorStop(1, 'rgba(255, 255, 255, 0)')
    cxt.fillStyle = grd
    cxt.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2)
  }
}
