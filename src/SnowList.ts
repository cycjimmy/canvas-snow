import type Snow from './Snow.js'

export default class SnowList {
  list: Snow[] = []

  update(): void {
    for (let i = 0, len = this.size(); i < len; i += 1) {
      this.list[i].update()
    }
  }

  push(snow: Snow): void {
    this.list.push(snow)
  }

  draw(cxt: CanvasRenderingContext2D): void {
    for (let i = 0, len = this.size(); i < len; i += 1) {
      this.list[i].draw(cxt)
    }
  }

  get(index: number): Snow | undefined {
    return this.list[index]
  }

  size(): number {
    return this.list.length
  }
}
