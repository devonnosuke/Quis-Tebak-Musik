// import { parseTime } from "./quisManager";
const backgroundAudio = document.getElementById("background-audio");
const backgroundAudio2 = document.getElementById("background-audio2");
const volumeRange = document.getElementById("volume-range");

let audio = null;
let sound = null;

volumeRange.addEventListener("input", () => {
  backgroundAudio.volume = volumeRange.value;
  backgroundAudio2.volume = volumeRange.value;
  if (audio) audio.volume = volumeRange.value;
  if (sound) sound.volume = volumeRange.value;
});

function playBacksound() {
  backgroundAudio.volume = 0.8;
  backgroundAudio2.pause();
  backgroundAudio.play();
}

function playBacksound2() {
  backgroundAudio2.volume = 0.8;
  backgroundAudio.pause();
  backgroundAudio2.play();
}

function stopBacksound() {
  backgroundAudio2.pause();
  backgroundAudio.pause();
}

function playClickSound(type) {
  let soundPath;
  switch (type) {
    case "accept":
      soundPath = "../assets/audio/accept-click.wav";
      break;
    case "back":
      soundPath = "../assets/audio/back-click.wav";
      break;
    case "login":
      soundPath = "../assets/audio/login.mp3";
      break;
    default:
      console.error("Invalid sound type:", type);
      return;
  }
  sound = new Audio(soundPath);
  sound.volume = 0.4;
  sound.play();
}

function stopMusic() {
  if (audio) {
    audio.pause();
    audio = null;
    backgroundAudio2.play();
  }
}

function toggleMusic(src, reff = "00:00") {
  // if (audio) {
  //   audio.pause();
  //   audio = null;
  //   audio.volume = 1;
  //   backgroundAudio.play();
  // } else {
  audio = new Audio(src);
  if (audio) {
    audio.play();
    audio.volume = 1;
    audio.currentTime = parseTime(reff);
    backgroundAudio.pause();
  }

  // }
}

window.playBacksound = playBacksound;
window.playBacksound2 = playBacksound2;
window.playClickSound = playClickSound;
window.stopMusic = stopMusic;
window.stopBacksound = stopBacksound;
window.toggleMusic = toggleMusic;
export {
  playBacksound,
  playBacksound2,
  playClickSound,
  stopMusic,
  stopBacksound,
  toggleMusic,
};
