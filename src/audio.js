export class AudioControl {
  constructor() {
    this.newGame = new Audio("/sounds/newgame.mp3");
    this.boom1 = new Audio("/sounds/boom1.mp3");
    this.boom2 = new Audio("/sounds/boom2.mp3");
    this.boom3 = new Audio("/sounds/boom3.mp3");
    this.boom4 = new Audio("/sounds/boom4.mp3");
    this.slide = new Audio("/sounds/slide.mp3");
    this.win = new Audio("/sounds/win.mp3");
    this.lose = new Audio("/sounds/lose.mp3");
    this.scream = new Audio("/sounds/scream.mp3");

    this.boomSounds = [this.boom1, this.boom2, this.boom3, this.boom4];
  }

  get randomBoom() {
    return this.boomSounds[Math.floor(Math.random() * this.boomSounds.length)];
  }
  play(audio) {
    console.log(audio);
    audio.currentTime = 0;
    audio.play();
  }
}
