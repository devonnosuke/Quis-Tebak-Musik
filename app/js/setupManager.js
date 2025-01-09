import { musicData } from "./data/musicData.js";
import {
  geInfoSong,
  getLocalData,
  setLocalData,
  shuffleArray,
} from "./utils.js";
window.musicData = musicData;

function showOptionShuffle() {
  const selectedSongs = getLocalData("songListRandom");
  if (selectedSongs) {
    const app = document.getElementById("app");
    app.innerHTML = `
            <h1>Kamu sudah membuat List Lagu!</h1>
            <div class="d-grid gap-3 setup-btn mt-3">
            <button onclick="confirmProceed(false); playClickSound('back');" class="btn btn-primary btn-lg">Acak & Tentukan Jumlah Lagu</button>
            <button onclick="showResultPage(); playClickSound('accept');" class="btn btn-primary btn-lg">Lihat List lagu</button>
            <button onclick="confirmProceed(true); playClickSound('back');" class="btn btn-primary btn-lg">Acak,Reset & Tentukan Jumlah Lagu</button>
            <button onclick="showWelcomeScreen(); playClickSound('back');" class="btn btn-secondary btn-lg">Kembali</button>
            </div>
          `;
  } else {
    showInputPage();
  }
}

function confirmProceed(is_new) {
  if (is_new) {
    if (
      confirm(
        "Yakin ingin membuat list baru ?, list sebelumnya akan dihapus dan semua yang telah terjawab akan direset."
      )
    ) {
      showInputPage(true);
    }
  } else {
    if (
      confirm(
        "Yakin ingin membuat list baru ?, list sebelumnya akan dihapus, tetapi yang sudah terjawab tidak akan digunakan lagi."
      )
    ) {
      showInputPage(false);
    }
  }
}

// Page 1: Input number of songs
function showInputPage(is_new = true) {
  let musicDatas = musicData;

  if (!is_new) {
    musicDatas = getLocalData("songListRandom", true);
  }

  console.log(musicDatas);
  // return;

  const app = document.getElementById("app");
  app.innerHTML = `
          <h1>Masukkan jumlah lagu</h1>
          <h3>Total lagu yang belum terjawab: ${musicDatas.length}</h3>
          <input style="padding: 10px;font-size: 2rem;width: 300px; text-align: center; margin: 20px"
            type="number"
            id="songCount"
            min="1"
            max="${musicDatas.length}"
            placeholder="Jumlah lagu"
            autofocus
          />
          <br>
          <button onclick="showMainMenu(); playClickSound('back');" class="btn btn-secondary btn-lg">kembali</button>
          ${
            is_new
              ? `<button onclick="proceedToShuffle(true); playClickSound('back');" class="btn btn-primary btn-lg">Lanjut</button>`
              : `<button onclick="proceedToShuffle(); playClickSound('back');" class="btn btn-primary btn-lg">Lanjut</button>`
          }
          
          <div id="list"></div>
      `;
}
// Page 2: Loading and shuffle logic
function proceedToShuffle(is_new = false) {
  let musicDatas = musicData;

  if (!is_new) {
    musicDatas = getLocalData("songListRandom", true);
  }

  console.log(musicDatas);
  const songCount = parseInt(document.getElementById("songCount").value);
  if (!songCount || songCount < 1 || songCount > musicDatas.length) {
    alert(`Masukkan angka antara 1 dan ${musicDatas.length}`);
    return;
  }
  // return;

  const app = document.getElementById("app");
  app.innerHTML = "<h1>Loading...</h1>";

  setTimeout(() => {
    shuffleArray(musicDatas);
    const selectedSongs = musicDatas.slice(0, songCount);
    shuffleArray(selectedSongs);

    if (!selectedSongs.length) {
      alert("gagal membuat daftar lagu");
      showInputPage();
      return;
    }
    setLocalData("songListRandom", selectedSongs);
    console.log("LocalData songListItem disetel", selectedSongs);
    // showResultPage();
    showOptionShuffle();
  }, 1000);
  448;
}

function showResultPage() {
  let i = 1;
  const selectedSongs = getLocalData("songListRandom");
  app.innerHTML = `
          <h1>Daftar Lagu Terpilih</h1>
          <div class="table-container border">
            <table class="table table-hover" style="text-align: left; text-transform: capitalize; width: max-content;">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Seri</th>
                  <th scope="col">Anime</th>
                  <th scope="col">Judul</th>
                </tr>
              </thead>
              <tbody>
              
                ${selectedSongs
                  .map(
                    (song) => `
                    <tr class="table-dark">
                        <td style="text-align: left; width: 30px">${i++}</td>
                        <td>${geInfoSong(song.title, 0)}</td>
                        <td>${geInfoSong(song.title, 1)}</td>
                        <td>${geInfoSong(song.title, 2)}</td>
                    </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          <button onclick="showMainMenu(); playClickSound('back');" class="btn btn-secondary btn-lg">Kembali</button>
      `;
}

window.showOptionShuffle = showOptionShuffle;
window.confirmProceed = confirmProceed;
window.proceedToShuffle = proceedToShuffle;
window.showResultPage = showResultPage;
window.showInputPage = showInputPage;

export { showOptionShuffle, confirmProceed, showResultPage, showInputPage };
