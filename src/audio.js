const sounds = {
  newGame: "newgame",
  boom1: "boom1",
  boom2: "boom2",
  boom3: "boom3",
  boom4: "boom4",
  slide: "slide",
  win: "win",
  lose: "lose",
  scream: "scream",
};

export class AudioControl {
  constructor() {
    this.newGame = document.getElementById(sounds.newGame);
    this.boom1 = document.getElementById(sounds.boom1);
    this.boom2 = document.getElementById(sounds.boom2);
    this.boom3 = document.getElementById(sounds.boom3);
    this.boom4 = document.getElementById(sounds.boom4);
    this.slide = document.getElementById(sounds.slide);
    this.win = document.getElementById(sounds.win);
    this.lose = document.getElementById(sounds.lose);
    this.scream = document.getElementById(sounds.scream);

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
