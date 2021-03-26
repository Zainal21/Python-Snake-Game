class Food {
    constructor(prop) {
      this.x = prop.x;
      this.y = prop.y;
      this.size = width;
    }
    draw() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.size, this.size);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }
  