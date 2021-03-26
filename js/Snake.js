class Snake {
    constructor(prop) {
      this.x = prop.x;
      this.y = prop.y;
      this.snakeSize = width;

      this.head = [];
      this.body = [];
  
      this.length = 6;
  
      this.moverX = 0;
      this.moverY = 0;
  
      this.init();
  
      this.dx = width;
      this.dy = 0;

      this.snakePotition = [];
    }
    init() {
      for (let i = this.length; i > 1; i--) {
        this.body.push({
          x: i * this.snakeSize + this.x + this.moverX,
          y: this.snakeSize + this.y + this.moverY,
        });
      }
      this.head = this.body[0];
    }
    draw() {
      this.body.forEach((_body) => {
        ctx.beginPath();
        ctx.rect(_body.x, _body.y, this.snakeSize, this.snakeSize);
        ctx.fillStyle = "darkorange";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      });
    }
    update(prop) {
      if (prop !== undefined) {
        this.dx = prop.dx;
        this.dy = prop.dy;
      }
      this.body.unshift({ x: this.head.x + this.dx, y: this.head.y + this.dy });
      this.body.pop();
      this.head = this.body[0];
      this.draw();
      this.checkIsWall();
    }
    checkIsWall() {
      if (this.head.x > canvas_width) { this.head.x = 0} 
      if (this.head.x < 0) { this.head.x =  canvas_width + width}
      if (this.head.y > canvas_height) { this.head.y = 0} 
      if (this.head.y < 0) { this.head.y = canvas_height + width}
    }
  }
  