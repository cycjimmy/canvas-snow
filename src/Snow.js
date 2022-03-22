export default class {
  constructor(x, y, radius, fn, canvasW, canvasH) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.fn = fn;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  update() {
    if (this.y > this.canvasH) {
      this.x = Math.random() * this.canvasW;
      this.y = 0;
    } else {
      this.x = this.fn.x(this.x, this.y);
      this.y = this.fn.y(this.y, this.y);
    }
  }

  draw(cxt) {
    const insideCxt = cxt;
    const grd = insideCxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    grd.addColorStop(0, `rgba(255, 255, 255, ${(this.r / 6)})`);
    grd.addColorStop(0.5, `rgba(255, 255, 255, ${(this.r / 6) * 0.5})`);
    grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
    insideCxt.fillStyle = grd;
    insideCxt.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
  }
}
