function setCookie(name, value) {
  const date = new Date();
  date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    JSON.stringify(value)
  )};path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return JSON.parse(decodeURIComponent(value));
  }
  return null;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// for name/info song

function getMusicDir(title, type = "") {
  return `answers/${title}/${title}${type}`;
}
function getTitleAnime(title, is_card = false) {
  let titles = title.split("_");

  if (is_card) {
    return `${titles[1]}</br>${titles[2]}`;
  }
  return `${titles[1]} | ${titles[2]}`;
}

function geInfoSong(title, id) {
  let titles = title.split("_");
  return titles[id];
}

function findMusicById(id) {
  for (let i = 0; i < musicData.length; i++) {
    if (musicData[i].id === id) {
      // console.log(musicData[i]);
      return musicData[i];
    }
  }
}

// Convert MM:SS to Seconds
function parseTime(reff) {
  const [minutes, seconds] = reff.split(":").map(Number);
  if (isNaN(minutes) || isNaN(seconds)) {
    alert("Invalid time format! Use MM:SS.");
    return 0;
  }
  return minutes * 60 + seconds;
}

function pause_qestions() {
  const countdownElement = document.getElementById("countdown1");
  countdownElement.innerHTML = `<i class="bi bi-question-lg qaw"></i>
			<i class="bi bi-question-lg qaw-2"></i>`;
}

function show_cut_scene(index, is_example) {
  let video;

  if (is_example) {
    video = musicDataExample[index];
  } else {
    video = findMusicById(parseInt(index));
  }

  let count = 4; // Starting number
  let countdown; // To store the interval
  // let music = musicData[index];

  let container_element = document.getElementById("show-cutscene");
  let video_element = document.getElementById("video");
  video_element.currentTime = parseTime(video.reff);
  video_element.volume = 0.85;
  video_element.play();

  let pic_element = document.getElementById("answer-img");

  countdown = setInterval(() => {
    count--;
    if (count > 0) {
      //
    } else {
      container_element.classList.add("video-container");
      video_element.classList.remove("hidden");
      pic_element.classList.add("hidden");
      clearInterval(countdown);
    }
  }, 1000);
}

function check_is_done(index, is_example) {
  // index -= 33;
  console.log(musicDataExample);
  index--;
  let music;

  if (is_example) {
    music = musicDataExample;
  } else {
    music = musicData;

    // ================
    let obj = findMusicByIdInCookie(parseInt(index));
    // console.log(obj);

    // 1.ambil cooke dan ubah ke object
    const musicCookie = getCookie("songListRandom");
    // console.log(musicCookie);

    // 2.Cari objek berdasarkan id dan ubah propertinya
    const idToModify = parseInt(index) + 1;
    console.log(idToModify);
    const updatedArray = musicCookie.map((obj) => {
      if (obj.id === idToModify) {
        return { ...obj, checked: true }; // Ubah properti `checked` menjadi true
      }
      return obj;
    });

    // 3. Menyimpan Kembali ke Cookie
    document.cookie = `songListRandom=${encodeURIComponent(
      JSON.stringify(updatedArray)
    )}; path=/; max-age=${60 * 60 * 24}`;

    console.log(updatedArray);
  }
}

function findMusicByIdInCookie(id) {
  let ids = parseInt(id);
  ids++;
  // console.log(ids);
  const selectedSongs = getCookie("songListRandom");
  for (let i = 0; i < selectedSongs.length; i++) {
    if (selectedSongs[i].id === parseInt(ids)) {
      console.log(selectedSongs[i]);
      return selectedSongs[i];
    }
  }
}

function checkContoh() {
  musicDataExample[0].checked = true;
}

window.setCookie = setCookie;
window.getCookie = getCookie;
window.shuffleArray = shuffleArray;
window.getMusicDir = getMusicDir;
window.getTitleAnime = getTitleAnime;
window.geInfoSong = geInfoSong;
window.findMusicById = findMusicById;
window.parseTime = parseTime;
window.pause_qestions = pause_qestions;
window.show_cut_scene = show_cut_scene;
window.check_is_done = check_is_done;
window.findMusicByIdInCookie = findMusicByIdInCookie;
window.checkContoh = checkContoh;

export {
  setCookie,
  getCookie,
  shuffleArray,
  getMusicDir,
  getTitleAnime,
  geInfoSong,
  findMusicById,
  parseTime,
  pause_qestions,
  show_cut_scene,
  check_is_done,
  findMusicByIdInCookie,
  checkContoh,
};
