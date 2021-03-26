class Game {
    constructor() {
      this.time = 0;
      this.score = 0; 
  
      this.snake;

  
      this.foods = [];
  
      this.directionPlayer = "";
      this.isNew = false;
  
  
      this.init();
      this.handleEvent(); 
    }  
    init() {
      this.drawBoard();
      this.generate();
      this.directionPlayer = "right";
    }
    isPot(x, y) {
      this.snake.body.forEach(_body => {
        if (_body.x == x && y.x == y) return true;
      });
      return false;
    }
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    PushFood(){
        this.foods.push(
            new Food({
                x: this.random(0, vertical) * width,
                y: this.random(0, horizontal) * width,
            })
        );
    }
    generate() {
      this.snake = new Snake({
        x: canvas_width / 2 - 4 * width,
        y: canvas_height / 2 - 1 * width,
      });
      for (let i = 0; i < 3; i++) {
        this.PushFood()
      }
      this.generateFood();
      this.removeFood();
    }
    removeFood() {
      setTimeout(() => {
        if (this.foods.length > 2) this.foods.shift()
        this.removeFood();
      }, 5000);
    }
    generateFood() {
      setTimeout(() => {
        if (this.foods.length < 3) {
          let done = false;
          while (!done) {
            let x = this.random(0, vertical) * width;
            let y = this.random(0, horizontal) * width;
            if (this.isPot(x, y)) {continue}
            else {this.PushFood();done = true}
          }
        }
        this.generateFood();
      }, 300);
    }
  
    drawBoard() {
      let color;
      // 48 x 30
      for (let i = 0; i < 48; i++) {
        for (let j = 0; j < 30; j++) {
          ctx.beginPath();
          ctx.rect(i * height, j * width, width, height);
          if ((i % 2 == 0 && j % 2 == 1) || (i % 2 == 1 && j % 2 == 0)) {color = "#0b3058"} 
          else {color = "#081727"}
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
    handleEvent() {
      document.addEventListener("keydown", (e) => {
        // kiri
        if ((e.key == 'a' || e.keyCode == 37 ) && this.directionPlayer !== "right") {this.directionPlayer = "left";game.snake.update({ dx: -width, dy: 0 })}
        // atas
        if ((e.key == 'w' || e.keyCode == 38)   && this.directionPlayer !== "down") {this.directionPlayer = "up";game.snake.update({ dx: 0, dy: -width })} 
        // kanan
        if ((e.key == 'd'  || e.keyCode == 39) && this.directionPlayer !== "left") {this.directionPlayer = "right";game.snake.update({ dx: width, dy: 0 })}
        // bawah
        if ((e.key == 's' || e.keyCode == 40)  && this.directionPlayer !== "up") { this.directionPlayer = "down"; game.snake.update({ dx: 0, dy: width })} 
      }); 
    }
    update() {
      this.isLose();
      this.snake.update();
      this.foods.forEach((food) => food.draw());
      this.snake.body.forEach(_body => {
        this.foods.forEach((f, index) => {
          if (f.x == _body.x && f.y == _body.y) {
            this.snake.length++;
            this.foods.splice(index, 1);
            this.isNew = true;
            this.addLength();
            // generate food again
            this.PushFood()
          }
        });
      });
      _Score.innerHTML = this.snake.length;
      game.score = this.snake.length
    }
    addLength() {
      let last = this.snake.body[this.snake.body.length - 1];
      if (this.isNew) {
        this.snake.body.push({
          x: last.x,
          y: last.y,
        });
      }
      this.isNew = false;
    }
    isLose() {
      for (let i = 1; i < this.snake.body.length; i++) {
        let _body = this.snake.body[i];
        if (this.snake.body[0].x == _body.x && this.snake.body[0].y == _body.y) {
          clearInterval(gameInterval);
          confirm(`Game Over:  Score: ${game.score}! Play again?`) ? location.reload() : location.reload()
        }
      }
    }
  }
  
