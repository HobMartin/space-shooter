import { AudioControl } from "./audio.js";
import {
  DEBUG_BUTTONS,
  ENEMIES_NUMBER,
  FULL_SCREEN_BUTTONS,
  PLAYER_LIVES,
  START_GAME_BUTTONS,
  WINNING_SCORE,
} from "./constants.js";
import { Beetlemorph } from "./enemies/beetlemorph.js";
import { Lobstermoph } from "./enemies/lobstermorph.js";
import { PhantomMorph } from "./enemies/phantomMorph.js";

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;

    this.score = 0;
    this.lives = PLAYER_LIVES;
    this.winningScore = WINNING_SCORE;
    this.message1 = "Run!";
    this.message2 = "Or get eaten!";
    this.message3 = "Press ENTER or R to start";
    this.crewImage = document.getElementById("crewSprite");
    this.crewMembers = [];
    this.gameOver = true;

    this.debug = false;

    this.enemies = [];
    this.numberOfEnemies = ENEMIES_NUMBER;
    this.createEnemies();

    this.enemyTimer = 0;
    this.enemyInterval = 1000;

    this.spriteTimer = 0;
    this.spriteInterval = 100;
    this.spriteUpdate = false;

    this.sound = new AudioControl();

    this.mouse = {
      x: undefined,
      y: undefined,
      pressed: false,
      fired: false,
    };

    this.resize(window.innerWidth, window.innerHeight);

    this.resetButton = document.getElementById("resetButton");
    this.resetButton.addEventListener("click", () => {
      this.start();
    });

    this.fullScreenButton = document.getElementById("fullScreenButton");
    this.fullScreenButton.addEventListener("click", () => {
      this.toggleFullScreen();
    });

    window.addEventListener("resize", (e) => {
      this.resize(e.target.innerWidth, e.target.innerHeight);
    });

    window.addEventListener("mousedown", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = true;
      this.mouse.fired = false;
    });

    window.addEventListener("mouseup", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = false;
    });

    // touch events
    window.addEventListener("touchstart", (e) => {
      console.log(e);
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = true;
      this.mouse.fired = false;
    });

    window.addEventListener("touchend", (e) => {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
      this.mouse.pressed = false;
    });

    window.addEventListener("keyup", (e) => {
      if (START_GAME_BUTTONS.includes(e.key)) {
        this.start();
      }
      if (FULL_SCREEN_BUTTONS.includes(e.key)) {
        this.toggleFullScreen();
      }
      if (DEBUG_BUTTONS.includes(e.key)) {
        this.toggleDebug();
      }
    });
  }

  start() {
    this.resize(window.innerWidth, window.innerHeight);
    this.score = 0;
    this.lives = 10;
    this.generateCrew();
    this.gameOver = false;

    if (this.enemies.length === 0) this.createEnemies();

    this.enemies.forEach((enemy) => {
      enemy.reset();
    });

    for (let i = 0; i < 2; i++) {
      const enemy = this.getEnemy();
      if (enemy) {
        enemy.start();
      }
    }

    this.sound.play(this.sound.newGame);
  }

  toggleDebug() {
    this.debug = !this.debug;
  }

  generateCrew() {
    this.crewMembers = [];
    for (let i = 0; i < this.lives; i++) {
      this.crewMembers.push({
        frameX: Math.floor(Math.random() * 5),
        frameY: Math.floor(Math.random() * 5),
      });
    }
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "white";
    this.ctx.font = "30px Audiowide";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
  }

  toggleFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    const cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }

  checkCollision(enemy) {
    const dx = this.mouse.x - enemy.x;
    const dy = this.mouse.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < enemy.width) {
      return true;
    }
    return false;
  }

  createEnemies() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      // const randomNumber = Math.random();
      this.enemies.push(new PhantomMorph(this));
      // if (randomNumber < 0.8) {
      //   this.enemies.push(new Lobstermoph(this));
      // } else {
      //   this.enemies.push(new Beetlemorph(this));
      // }
    }
  }

  getEnemy() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      if (this.enemies[i].free) {
        return this.enemies[i];
      }
    }
    return null;
  }

  handleEnemies(deltaTime) {
    this.enemyTimer += deltaTime;
    if (this.enemyTimer > this.enemyInterval) {
      this.enemyTimer = 0;
      const enemy = this.getEnemy();
      if (enemy) {
        enemy.start();
      }
    }
  }

  triggerGameOver() {
    if (this.gameOver) {
      return;
    }
    this.gameOver = true;
    this.enemies = [];
    if (this.lives < 1) {
      this.message1 = "You got eaten!";
      this.message2 = "Game Over!";
      this.sound.play(this.sound.lose);
    } else if (this.score >= this.winningScore) {
      this.message1 = "You escaped!";
      this.message2 = "You Win!";
      this.sound.play(this.sound.win);
    }
  }

  handleSpriteTimer(deltaTime) {
    if (this.spriteTimer < this.spriteInterval) {
      this.spriteTimer += deltaTime;
      this.spriteUpdate = false;
    } else {
      this.spriteTimer = 0;
      this.spriteUpdate = true;
    }
  }

  drawStatusText() {
    this.ctx.save();
    this.ctx.textAlign = "left";
    this.ctx.fillText(`Score: ${this.score}`, 20, 40);
    for (let i = 0; i < this.lives; i++) {
      const w = 20;
      const h = 45;
      this.ctx.drawImage(
        this.crewImage,
        w * this.crewMembers[i]?.frameX,
        h * this.crewMembers[i]?.frameY,
        w,
        h,
        20 + i * 20,
        60,
        w,
        h
      );
    }

    if (this.lives < 1 || this.score >= this.winningScore) {
      this.triggerGameOver();
    }

    if (this.gameOver) {
      this.ctx.textAlign = "center";
      this.ctx.font = "60px Audiowide";
      this.ctx.fillText(this.message1, this.width / 2, this.height / 2);
      this.ctx.font = "30px Audiowide";
      this.ctx.fillText(this.message2, this.width / 2, this.height / 2 + 60);
      this.ctx.fillText(this.message3, this.width / 2, this.height / 2 + 120);
    }
    this.ctx.restore();
  }

  render(deltaTime) {
    this.handleSpriteTimer(deltaTime);
    this.drawStatusText();
    if (!this.gameOver) this.handleEnemies(deltaTime);

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      this.enemies[i].update(deltaTime);
    }
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }
}
