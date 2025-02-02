
function setLocalData(key, value) {

  localStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
}

function getLocalData(key, without_checked_music = false) {
	const data = localStorage.getItem(key);
	if (!data) return null;

	const parsedData = JSON.parse(decodeURIComponent(data));

	if (without_checked_music) {
		// Filter musicData ORI berdasarkan checked di parsedData
		return musicData.filter(
			(oriItem) => !parsedData.some((selectedItem) => selectedItem.id === oriItem.id && selectedItem.checked)
		);
	}

	return parsedData;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// for name/info song

function getMusicDir(title, type = "") {
  // if(type =='.mp4') {
  //   return `answers/${title}/gain_${title}${type}`;
  // }
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
    const musicLocalData = getLocalData("songListRandom");
    console.log(musicLocalData);

    // 2.Cari objek berdasarkan id dan ubah propertinya
    const idToModify = parseInt(index) + 1;
    console.log(idToModify);
    const updatedArray = musicLocalData.map((obj) => {
      if (obj.id === idToModify) {
        return { ...obj, checked: true }; // Ubah properti `checked` menjadi true
      }
      return obj;
    });

    // 3. Menyimpan Kembali ke Cookie
    // document.cookie = `songListRandom=${encodeURIComponent(
    //   JSON.stringify(updatedArray)
    // )}; path=/; max-age=${60 * 60 * 24}`;

    setLocalData("songListRandom", updatedArray);

    console.log(getLocalData("songListRandom"));
  }
}

function findMusicByIdInCookie(id) {
  let ids = parseInt(id);
  ids++;
  // console.log(ids);
  const selectedSongs = getLocalData("songListRandom");
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

// ========= for handle button

function handlePlay(index, is_example) {
  document.getElementById('btn-play').disabled = true;
  
  // Tunggu 3 detik sebelum mengaktifkan tombol stop
  setTimeout(()=>{
    document.getElementById('btn-stop').disabled = false;
  }, 3000);
  
  // Tunggu 9 detik sebelum mengaktifkan tombol stop
  setTimeout(()=>{
    document.getElementById('btn-jawaban').disabled = false;
  }, 9000);

  // Panggil fungsi tambahan sesuai kebutuhan
  stopMusic();
  startCountdown('countdown1',index,false,is_example);
  playClickSound('login');
}

function handleStop() {
	// Ubah status tombol
  document.getElementById("btn-play").disabled = false;
	document.getElementById("btn-stop").disabled = true;
	document.getElementById("btn-jawaban").disabled = false;

	// Panggil fungsi tambahan sesuai kebutuhan
	stopMusic();
	pause_qestions();
}

function handleJawaban(index, is_example) {

  document.getElementById("btn-play").disabled = false;
  document.getElementById('btn-stop').disabled = true;
  document.getElementById('btn-jawaban').disabled = true;


	// Tambahkan logika jika diperlukan
	stopMusic();
	startCountdown('countdown2', index, true, is_example);
	playClickSound('login');
}



window.setLocalData = setLocalData;
window.getLocalData = getLocalData;
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
window.handlePlay = handlePlay;
window.handleStop = handleStop;
window.handleJawaban = handleJawaban;

export {
  setLocalData,
  getLocalData,
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
  handlePlay,
  handleStop,
  handleJawaban,
};
