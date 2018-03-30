export default class {
  constructor() {
    this.list = [];
  };

  update() {
    for (let i = 0, len = this.size(); i < len; i++) {
      this.list[i].update();
    }
  };

  push(snow) {
    this.list.push(snow);
  };

  draw(cxt) {
    for (let i = 0, len = this.size(); i < len; i++) {
      this.list[i].draw(cxt);
    }
  };

  get(index) {
    return this.list[index];
  };

  size() {
    return this.list.length;
  };
};