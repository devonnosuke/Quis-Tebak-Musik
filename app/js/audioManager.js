// import { parseTime } from "./quisManager";
const backgroundAudio = document.getElementById("background-audio");
const backgroundAudio2 = document.getElementById("background-audio2");
const volumeRange = document.getElementById("volume-range");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function normalizeVolume(trackELement ,targetDb = -20 ) {

  const track = audioContext.createMediaElementSource(trackELement);

  // Buat GainNode untuk mengatur volume
  const gainNode = audioContext.createGain();
  track.connect(gainNode).connect(audioContext.destination);

  // Deteksi dB dan normalisasi
  const analyser = audioContext.createAnalyser();
  track.connect(analyser);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(dataArray);

  // Hitung level rata-rata dB
  let rms = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const sample = dataArray[i] / 128 - 1;
    rms += sample * sample;
  }
  rms = Math.sqrt(rms / dataArray.length);
  const currentDb = 20 * Math.log10(rms);

  // Hitung gain untuk menyesuaikan ke target dB
  const adjustment = targetDb - currentDb;
  gainNode.gain.value = Math.pow(10, adjustment / 20);
}


let audio = null;
let sound = null;
let volumeMaster = 50/100;
setAllVolumeToMasterVolume();

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
  normalizeVolume(backgroundAudio);
  normalizeVolume(backgroundAudio2);
  backgroundAudio.volume = volumeMaster;
  backgroundAudio2.volume = volumeMaster;
  

  if (audio != null || sound != null) {
    audio.volume = volumeMaster;
    console.log('MUSIC SET volume Master is ',volumeMaster);
  }
  let video = document.getElementById('video');

  if (video) {
    video.addEventListener('loadedmetadata', () => {
      video.volume = volumeMaster;
      console.log(video.volume);
    });
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
