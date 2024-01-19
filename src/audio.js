const sounds = {
  newGame: "newgame.mp3",
  boom1: "boom1.mp3",
  boom2: "boom2.mp3",
  boom3: "boom3.mp3",
  boom4: "boom4.mp3",
  slide: "slide.mp3",
  win: "win.mp3",
  lose: "lose.mp3",
  scream: "scream.mp3",
};

const buildAudio = (name) => {
  const source = new URL(`../assets/sounds/${name}`, import.meta.url).href;
  const audio = new Audio(source);
  return audio;
};

export class AudioControl {
  constructor() {
    this.newGame = buildAudio(sounds.newGame);
    this.boom1 = buildAudio(sounds.boom1);
    this.boom2 = buildAudio(sounds.boom2);
    this.boom3 = buildAudio(sounds.boom3);
    this.boom4 = buildAudio(sounds.boom4);
    this.slide = buildAudio(sounds.slide);
    this.win = buildAudio(sounds.win);
    this.lose = buildAudio(sounds.lose);
    this.scream = buildAudio(sounds.scream);

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
