export class Enemy {
  constructor(game) {
    this.game = game;
    this.spriteWidth = 100;
    this.spriteHeight = 100;
    this.sizeModifier = Math.random() * 0.3 + 0.8;
    this.x = 0;
    this.y = 0;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.speedX = 0;
    this.speedY = 0;
    this.frameY = 0;
    this.frameX = 0;
    this.lastFrame = 0;
    this.minFrame = 0;
    this.maxFrame = 0;
    this.lives = 0;
    this.free = true;
  }

  get alive() {
    return this.lives > 0;
  }

  get collision() {
    return (
      this.game.checkCollision(this) &&
      this.game.mouse.pressed &&
      !this.game.mouse.fired
    );
  }

  start() {
    this.free = false;
    this.x = Math.random() * this.game.width;
    this.y = -this.height;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 4);
  }

  reset() {
    this.free = true;
  }

  hit() {
    if (this.collision) {
      this.lives--;
      this.game.mouse.fired = true;
    }
  }

  update() {
    if (this.free) {
      return;
    }
    if (this.y < 0) {
      this.y += 2;
    }

    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y + this.height >= this.game.height) {
      this.reset();

      if (!this.game.gameOver) {
        this.game.lives--;
        this.game.sound.play(this.game.sound.scream);
      }
    }

    if (!this.alive) {
      if (this.game.spriteUpdate) {
        this.frameX++;
        if (this.frameX > this.lastFrame) {
          this.reset();
          if (!this.game.gameOver) {
            this.game.score++;
          }
        }
      }
    }
  }

  drawDebug() {
    this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.game.ctx.fillText(
      this.lives,
      this.x + this.width * 0.5,
      this.y + this.height * 0.5
    );
  }

  draw() {
    if (this.free) {
      return;
    }
    this.game.ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.game.debug) {
      this.drawDebug();
    }
  }
}
