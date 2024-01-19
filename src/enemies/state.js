export class EnemyState {
  constructor(game, enemy) {
    this.game = game;
    this.enemy = enemy;
  }
}

export class Flying extends EnemyState {
  start() {
    this.enemy.minFrame = 0;
    this.enemy.maxFrame = 2;
    this.enemy.speedX = Math.random() * 2 - 1;
    this.enemy.speedY = Math.random() * 0.5 + 0.2;
    this.enemy.frameX = this.enemy.minFrame;
  }

  update() {
    this.enemy.hit();
    this.enemy.handleFrames();
  }
}

export class Phasing extends EnemyState {
  start() {
    this.enemy.minFrame = 3;
    this.enemy.maxFrame = 5;
    this.enemy.speedX = Math.random() * 2 - 1;
    this.enemy.speedY = Math.random() * 0.5 + 0.2;
    this.enemy.frameX = this.enemy.minFrame;
  }

  update() {
    this.enemy.handleFrames();
    if (this.enemy.collision) {
      this.enemy.y += 25;
      this.enemy.speedX = 0;
      this.enemy.speedY = 2;
      this.game.sound.play(this.game.sound.slide);
    }
  }
}

export class Imploding extends EnemyState {
  start() {
    this.enemy.minFrame = 6;
    this.enemy.maxFrame = this.enemy.lastFrame + 1;
    this.enemy.frameX = this.enemy.minFrame;
    this.game.sound.play(this.game.sound.randomBoom);
  }

  update() {}
}
