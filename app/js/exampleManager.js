import { musicDataExample } from "./data/musicDataExample.js";
import { getMusicDir, getTitleAnime, geInfoSong } from "./utils.js";
window.musicDataExample = musicDataExample;

function startExample() {
  closeModal();
  app.innerHTML = `
          <h1>Contoh List Lagu Tebakan</h1>
          <div id="cards-container" style="overflow-y: auto; max-height: 80vh;">
              ${musicDataExample
                .map(
                  (music, index) => `
                  <div class="card border-secondary mb-3" style="max-width: 20rem;" onclick="playClickSound('accept'); playMusic(${index},${true}); playBacksound2()">
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
                                  <p class="card-text text-success text-wrap" style="font-size: 1.1rem">${getTitleAnime(
                                    music.title
                                  )}</p>
                                  `
                          : `
                              <h4 class="card-title text-light">
                                  <img src="assets/images/notes.png" class="img-fluid" id="answer-img" style="width: 200px">
                              </h4>
                              <p class="card-text text-success text-wrap" style="font-size: 1.1rem">#${
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
          <button class="btn btn-secondary btn-lg mt-3" onclick="playClickSound('back'); showHowToPlay()">Kembali</button>
      `;
}

window.startExample = startExample;

export { startExample };
