import {
  getLocalData,
  getMusicDir,
  getTitleAnime,
  show_cut_scene,
} from "./utils.js";
import {
  stopBacksound,
  toggleMusic,
  setAllVolumeToMasterVolume,
} from "./audioManager.js";

function startQuiz(ids = null) {
  // console.log(ids);
  closeModal();
  const selectedSongs = getLocalData("songListRandom");
  // console.log(selectedSongs);
  if (!selectedSongs) {
    app.innerHTML = `
			<h1>Kamu belum melakukan Setup Lagu!</h1>
			<button class="btn btn-secondary btn-lg mt-3" onclick="playClickSound('back'); showMainMenu()">Kembali</button>
		`;
  } else {
    app.innerHTML = `
		<h1>List Lagu Tebakan</h1>
		<div id="cards-container" style="overflow-y: auto; max-height: 80vh;">
			${selectedSongs
        .map(
          (music, index) => `
				<div class="card border-secondary mb-3 ${
          music.checked ? "bg-info" : "bg-dark"
        }" style="max-width: 20rem;" onclick="playClickSound('accept'); playMusic(${
            music.id
          },${false},${index}); playBacksound2()" id="${index + 1}">
					<div class="card-body">
					${
            music.checked
              ? `
							<h4 class="card-title text-light">
								<img src="${getMusicDir(
                  music.title,
                  ".png"
                )}" class="img-fluid" id="answer-img" style="width: 200px">
							</h4>
							<p class="card-text text-dark text-wrap" style="font-size: 1.1rem;line-height: 1.2rem;">${getTitleAnime(
                music.title,
                true
              )}</p>
							`
              : `
							<h4 class="card-title text-light">
								<img src="assets/images/notes.png" class="img-fluid" id="answer-img" style="width: 200px">
							</h4>
							<p class="card-text text-success text-wrap" style="font-size: 2.2rem">#${
                index + 1
              }</p>
							`
          }	
						</h4>
					</div>
				</div>
				`
        )
        .join("")}
		</div>
		<button class="btn btn-secondary btn-lg mt-3" onclick="playClickSound('back'); showMainMenu();">Kembali</button>
    `;
    scrollToElement(ids);
  }
}

function scrollToElement(id) {
  // Tambahkan hash ke URL

  if (id == null) {
    return;
  }

  window.location.hash = id + 1;
  console.log(id);

  // Cari elemen dengan ID yang diberikan
  const targetElement = document.getElementById(id);

  if (targetElement) {
    // Gulir halaman ke elemen target
    targetElement.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error(`Element with ID "${id}" not found.`);
  }
}

function playMusic(index, is_example = false, id) {
  // console.log("is_example: ", is_example);
  // const music = musicData[index];
  // backgroundAudio.pause();

  app.innerHTML = `
		<h2 class="text-success">Music #${++id}</h2>
		<h1>Musik Dari Anime Apakah Ini?</h1>
		<div class="heart" id="countdown1">
			<i class="bi bi-question-lg qaw"></i>
			<i class="bi bi-question-lg qaw-2"></i>
		</div>
		<p class="lead mb-4">Siapa cepat dia dapat!</p>
		<div id="options">
			<button id="btn-play" class="btn btn-primary btn-lg" onclick="handlePlay('${index}', ${is_example})">
				Play 
				<i class="bi bi-play-circle"></i>	
			</button>
			<button id="btn-stop" class="btn btn-primary btn-lg" onclick="handleStop()" disabled>
				Stop 
				<i class="bi bi-stop-circle inline-block"></i>
			</button>
			<button id="btn-jawaban" class="btn btn-primary btn-lg" onclick="handleJawaban('${index}', ${is_example})" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled>
				Jawaban 
				<i class="bi bi-question-circle"></i>
			</button>
		</div>
		${
      is_example
        ? `<button class="btn btn-secondary btn-lg mt-4" onclick="stopMusic(); playClickSound('back'); startExample();playBacksound()">Kembali</button>`
        : `<button class="btn btn-secondary btn-lg mt-4" onclick="stopMusic(); playClickSound('back'); startQuiz();playBacksound()">Kembali</button>`
    }

		<div class="modal fade modal-xl" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
			<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					
				</div>
				<div class="modal-body text-center" id="countdown2">
					
				</div>
				<div class="modal-footer text-center">
					<div class="form-check" style="margin: 0 auto;">
						${
              is_example
                ? `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="checkContoh(); startExample(); playBacksound();">Kembali ke Contoh</button>`
                : `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="check_is_done(${index},${is_example}); startQuiz(${id}); playBacksound();">Tandai Telah Terjawab dan Lanjut Berikutnya</button>`
            }
					</div>
				</div>
			</div>
			</div>
		</div>
	`;
}

function startCountdown(content, index, is_answer = false, is_example = false) {
  // backgroundAudio.pause();
  stopBacksound();
  // console.log("is Answer: ", is_answer);
  // console.log("is Example: ", is_example);

  // Ask for confirmation before playing
  if (is_answer) {
    const confirmation = confirm(`Yakin ingin melihat jawaban?`);
    if (!confirmation) {
      return; // Exit if user cancels
    }

    // Dynamic import
    import("./bootstrap.bundle.min.js")
      .then(() => {
        // Akses bootstrap dari objek global
        const modal_container = document.getElementById("exampleModal");
        const modal_instance = new window.bootstrap.Modal(modal_container);
        modal_instance.show();
      })
      .catch((error) => {
        console.error("Failed to load Bootstrap:", error);
      });
  }
  let music;

  if (is_example) {
    music = musicDataExample[index];
  } else {
    music = findMusicById(parseInt(index));
  }

  let count = 3; // Starting number
  let countdown; // To store the interval

  const countdownElement = document.getElementById(content);

  // Reset the count
  countdownElement.innerHTML = is_answer
    ? ` <div class="countdown-style">${count}</div>`
    : count;
  // countdownElement.innerHTML  = ;
  // Start the countdown
  countdown = setInterval(() => {
    count--;
    if (count > 0) {
      countdownElement.innerHTML = is_answer
        ? `
        <div class="countdown-style">${count}</div>
        <div id="answer_content" class="hidden">
          <h1 class="modal-title text-wrap" style="font-size: 1.8rem; line-height:1">Jawaban: </br>
          <span class="text-success" style="font-size: 2rem;text-transform: capitalize">${getTitleAnime(
            music.title
          )}</span>
          </h1>
          <div id="show-cutscene">
            <img src="${getMusicDir(
              music.title,
              ".png"
            )}" class="img-fluid" id="answer-img" style="max-height:60vh">
            <video controls class="hidden" id="video" preload="auto">
            <source src="${getMusicDir(music.title, ".mp4")}" type="video/mp4">
            Your browser does not support the video tag.
            </video>
          </div>
        </div>
        `
        : count;
      setAllVolumeToMasterVolume();
    } else {
      if (is_answer) {
        setAllVolumeToMasterVolume();
        let answerContent = document.getElementById("answer_content");
        let countdownContent = document.querySelector(".countdown-style");
        answerContent.classList.remove("hidden");
        countdownContent.classList.add("hidden");

        show_cut_scene(index, is_example);
        // video_element.innerHTML = ``;
      } else {
        countdownElement.innerHTML = `<i class="bi bi-question-lg qaw text-danger"></i>
				<i class="bi bi-question-lg qaw-2 text-danger"></i>`;
        toggleMusic(getMusicDir(music.title, ".mp4"), music.reff);
      }
      clearInterval(countdown); // Stop the countdown
    }
  }, 1000);
}

function closeModal() {
  const modalBackdrop = document.querySelector(".modal-backdrop");
  if (modalBackdrop) {
    modalBackdrop.remove();
    console.log("close Backdrop just running");
  }
}

window.startQuiz = startQuiz;
window.playMusic = playMusic;
window.startCountdown = startCountdown;
window.closeModal = closeModal;

export { startQuiz, playMusic, startCountdown, closeModal };
