class Character {
  constructor(char, x, y, size, vel, brightness) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.size = size;
    this.brightness = brightness;
    this.isDiming = false;
  }

  update() {
    this.y += this.vel;
    if (this.isDiming) this.brightness -= 0.005;
  }

  startDiming() {
    this.isDiming = true;
  }

  show() {
    L.textAlign("center");
    L.fill(`rgba(0, 255, 0, ${this.brightness})`);
    L.textFont(`${this.size}px serif`);
    L.Text(this.char, this.x, this.y);
  }

  shouldRemove() {
    if (this.y > L.height + this.size || this.brightness <= 0) {
      return true;
    }
  }
}
