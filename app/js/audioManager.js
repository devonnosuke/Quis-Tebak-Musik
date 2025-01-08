// import { parseTime } from "./quisManager";
const backgroundAudio = document.getElementById("background-audio");
const backgroundAudio2 = document.getElementById("background-audio2");
const volumeRange = document.getElementById("volume-range");

window.addEventListener('load', () => {
  volumeMaster = volumeRange.value / 100;
  console.log(volumeMaster);
  setAllVolumeToMasterVolume();
});

let audio = null;
let sound = null;
let volumeMaster = 50/100;
// setAllVolumeToMasterVolume();

volumeRange.addEventListener("input", () => {
  volumeMaster = volumeRange.value / 100;
  setAllVolumeToMasterVolume();
});

function playBacksound() {
  backgroundAudio2.pause();
  backgroundAudio.play();
}

function playBacksound2() {
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
      soundPath = "../app/assets/audio/accept-click.mp3";
      break;
    case "back":
      soundPath = "../app/assets/audio/back-click.mp3";
      break;
    case "login":
      soundPath = "../app/assets/audio/login.mp3";
      break;
    default:
      console.error("Invalid sound type:", type);
      return;
  }
  let soundClick = new Audio(soundPath);
  soundClick.play();
  soundClick.volume = volumeMaster;
}

function stopMusic() {
  if (audio) {
    audio.pause();
    audio = null;
    backgroundAudio2.play();
  }
}

function toggleMusic(src, reff = "00:00") {

  audio = new Audio(src);
  if (audio) {
    audio.play();
    audio.volume = volumeMaster;
    audio.currentTime = parseTime(reff);
    backgroundAudio.pause();
  }

}

function setAllVolumeToMasterVolume() {
  console.log('volume Master is ',volumeMaster);
  // normalizeVolume(backgroundAudio);
  // normalizeVolume(backgroundAudio2);
  backgroundAudio.volume = volumeMaster;
  backgroundAudio2.volume = volumeMaster;
  

  if (audio) {
    audio.volume = volumeMaster;
    console.log('MUSIC SET volume Master is ',volumeMaster);
  }

  const video = document.getElementById('video');
  if (video) {
    video.addEventListener('canplay', () => {
      video.volume = volumeMaster;
      console.log(video.volume);
    });
    video.volume = volumeMaster;
  }
}

window.playBacksound = playBacksound;
window.playBacksound2 = playBacksound2;
window.playClickSound = playClickSound;
window.stopMusic = stopMusic;
window.stopBacksound = stopBacksound;
window.toggleMusic = toggleMusic;
window.setAllVolumeToMasterVolume = setAllVolumeToMasterVolume;

export {
  playBacksound,
  playBacksound2,
  playClickSound,
  stopMusic,
  stopBacksound,
  toggleMusic,
  setAllVolumeToMasterVolume,
};
