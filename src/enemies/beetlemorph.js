import { Enemy } from "./enemy";

export class Beetlemorph extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById("beetlemorph");
  }
  start() {
    super.start();
    this.speedX = 0;
    this.speedY = Math.random() * 2 + 0.2;
    this.lives = 1;
    this.lastFrame = 3;
  }

  update() {
    super.update();
    if (this.free) {
      return;
    }

    if (this.alive) {
      this.hit();
    }
  }
}
