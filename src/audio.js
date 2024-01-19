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
const buildSoundSrc = (sound) => `${import.meta.url}/sounds/${sound}`;

export class AudioControl {
  constructor() {
    this.newGame = new Audio(buildSoundSrc(sounds.newGame));
    this.boom1 = new Audio(buildSoundSrc(sounds.boom1));
    this.boom2 = new Audio(buildSoundSrc(sounds.boom2));
    this.boom3 = new Audio(buildSoundSrc(sounds.boom3));
    this.boom4 = new Audio(buildSoundSrc(sounds.boom4));
    this.slide = new Audio(buildSoundSrc(sounds.slide));
    this.win = new Audio(buildSoundSrc(sounds.win));
    this.lose = new Audio(buildSoundSrc(sounds.lose));
    this.scream = new Audio(buildSoundSrc(sounds.scream));

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
