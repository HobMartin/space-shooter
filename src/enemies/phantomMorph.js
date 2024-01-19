import { Enemy } from "./enemy";
import { Flying, Imploding, Phasing } from "./state";

export class PhantomMorph extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById("phantomMorph");
    this.lastFrame = 14;
    this.states = [
      new Flying(game, this),
      new Phasing(game, this),
      new Imploding(game, this),
    ];
    this.currentState = this.states[1];
    this.switchTimer = 0;
    this.switchInterval = Math.random() * 2000 + 1000;
  }
  start() {
    super.start();

    this.lives = 1;
    this.setState(Math.floor(Math.random() * 2));
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.start();
  }

  handleFrames() {
    if (this.game.spriteUpdate) {
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = this.minFrame;
      }
    }
  }

  switch() {
    if (this.currentState instanceof Flying) {
      this.setState(1);
    } else if (this.currentState instanceof Phasing) {
      this.setState(0);
    }
  }

  hit() {
    super.hit();
    if (!this.alive) {
      this.setState(2);
    }
  }

  update(deltaTime) {
    super.update();
    if (this.free) {
      return;
    }

    this.currentState.update();

    if (this.x <= 0 || this.x >= this.game.width - this.width) {
      this.speedX = -this.speedX;
    }

    if (this.alive) {
      if (this.switchTimer < this.switchInterval) {
        this.switchTimer += deltaTime;
      } else {
        this.switchTimer = 0;
        this.switch();
      }
    }
  }
}
