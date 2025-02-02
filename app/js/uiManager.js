import { playClickSound, playBacksound } from "./audioManager.js";
import { musicData } from "./data/musicData.js";
import { startQuiz } from "./quisManager.js";
import {
  showOptionShuffle,
  confirmProceed,
  showResultPage,
} from "./setupManager.js";

import { startExample } from "./exampleManager.js";

const app = document.getElementById("app");

function showWelcomeScreen() {
  app.innerHTML = `
		<section class="flex">
			<h1>Kuis Tebak Musik</h1>
			<img src="assets/images/Anime-logo.png" class="img-responsive">
			<button class="btn btn-primary btn-lg" id="start" onclick="showMainMenu();playBacksound();playClickSound('accept');">Mulai Quis!</button>
		</section>
	`;
}

function showMainMenu() {
  app.innerHTML = `
		<h1>Kuis Tebak Musik</h1>
		<div>
			<div class="card border-secondary mb-3  bg-dark " style="width: 18rem; padding: 4rem 0" onclick="playClickSound('accept'); startQuiz()">
				<div class="card-body">
					<h4 class="card-title text-body icon-menu"><i class="bi bi-dice-5"></i></h4>
					<p class="card-text">Mulai Kuis</p>
				</div>
			</div>
			<div class="card border-secondary mb-3  bg-dark " style="width: 18rem; padding: 4rem 0" onclick="playClickSound('accept'); showHowToPlay()">
				<div class="card-body">
					<h4 class="card-title text-body icon-menu"><i class="bi bi-card-list"></i></h4>
					<p class="card-text">Cara Bermain</p>
				</div>
			</div>
			<div class="card border-secondary mb-3  bg-dark " style="width: 18rem; padding: 4rem 0" onclick="playClickSound('accept'); showAbout()">
				<div class="card-body">
					<h4 class="card-title text-body icon-menu"><i class="bi bi-info-circle"></i></h4>
					<p class="card-text">Tentang</p>
				</div>
			</div>
			<div>
				<button class="btn btn-secondary btn-md" style="width: fit-content; margin: 15px" id="close-app-btn">Keluar</button>
			</div>
			<div class="btn btn-primary position-fixed fixed-top fixed-right" style="width: fit-content; margin: 15px" onclick="playClickSound('accept'); showOptionShuffle()">Setup<div>
			
		</div>
		<div>
	`;
  document.getElementById("close-app-btn").addEventListener("click", () => {
    window.electronAPI.closeApp();
  });
}

function showAbout() {
  app.innerHTML = `
		  <h1>Tentang</h1>
		  <p>Aplikasi ini dibuat untuk hiburan. Tebak musik anime favoritmu!</p>
		  <p><img src="assets/images/profile.jpg" style="width: 200px; border-radius: 500px" class="img-responsive"/></p>
		  <p>dibuat dengan 💖 dari @devonyura</p>
		  <h2 class="text-secondary">Kuis Tebak Music Anime Ver.2.0</h2>
		  <button class="btn btn-secondary btn-lg mt-3" onclick="playClickSound('back'); showMainMenu()">Kembali</button>
	  `;
}

function showHowToPlay() {
  app.innerHTML = `
		  <div class="card border-secondary mb-3 bg-dark" style="width: 90%; padding: 1rem 0">
			  <div class="card-body">
				  <h1 class="text-light mb-5">Cara Bermain</h1>
				  <ol style="font-size: 2.4rem; text-align:left">
					  <li>Tentukan pemain (single/tim)</li>
					  <li>Musik tebakan akan diputar</li>
					  <li>Siapa yang paling cepat menekan bell boleh menjawab</li>
					  <li>Jika tebakan salah, giliran dilempar ke pemain lain</li>
					  <li>Musik dapat diputar kembali jika kurang jelas.</li>
					  <li>Enjoy the Game!</li>
				  </ol>
				  <button class="btn btn-primary btn-lg" onclick="playClickSound('back'); showMainMenu()">Kembali</button>
				  <button class="btn btn-secondary btn-lg" onclick="playClickSound('back'); startExample();">Coba Contoh</button>
			  </div>
		  </div>
	  `;
}

window.showWelcomeScreen = showWelcomeScreen;
window.showMainMenu = showMainMenu;
window.showAbout = showAbout;
window.showHowToPlay = showHowToPlay;

// Tambahkan fungsi lainnya di sini
export { showWelcomeScreen, showMainMenu, showAbout, showHowToPlay };
