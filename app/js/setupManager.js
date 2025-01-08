import { musicData } from "./data/musicData.js";
import { geInfoSong, getLocalData, setLocalData } from "./utils.js";
window.musicData = musicData;

function showOptionShuffle() {
  const selectedSongs = getLocalData("songListRandom");
  if (selectedSongs) {
    const app = document.getElementById("app");
    app.innerHTML = `
              <h1>Kamu sudah membuat List Lagu!</h1>
              
              <button onclick="showWelcomeScreen(); playClickSound('back');" class="btn btn-primary btn-lg">kembali</button>
              <button onclick="showResultPage(); playClickSound('accept');" class="btn btn-primary btn-lg">Lihat List lagu</button>
              <button onclick="confirmProceed(); playClickSound('back');" class="btn btn-primary btn-lg">Acak Kambali lagu</button>
          `;
  } else {
    showInputPage();
  }
}

function confirmProceed() {
  if (confirm("Yakin ingin membuat list baru, list sebelumnya akan dihapus?")) {
    showInputPage();
  }
}

// Page 1: Input number of songs
function showInputPage() {
  console.log("music data:", musicData);
  const app = document.getElementById("app");
  app.innerHTML = `
          <h1>Masukkan jumlah lagu</h1>
          <input style="padding: 10px;font-size: 2rem;width: 300px; text-align: center; margin: 20px"
            type="number"
            id="songCount"
            min="1"
            max="${musicData.length}"
            placeholder="Jumlah lagu"
            autofocus
          />
          <br>
          <button onclick="showMainMenu(); playClickSound('back');" class="btn btn-primary btn-lg">kembali</button>
          <button onclick="proceedToShuffle(); playClickSound('back');" class="btn btn-primary btn-lg">Lanjut</button>
          <div id="list"></div>
      `;
}
// Page 2: Loading and shuffle logic
function proceedToShuffle() {
  const songCount = parseInt(document.getElementById("songCount").value);
  if (!songCount || songCount < 1 || songCount > musicData.length) {
    alert(`Masukkan angka antara 1 dan ${musicData.length}`);
    return;
  }

  const app = document.getElementById("app");
  app.innerHTML = "<h1>Loading...</h1>";

  setTimeout(() => {
    shuffleArray(musicData);
    const selectedSongs = musicData.slice(0, songCount);

    if (!selectedSongs.length) {
      alert("gagal membuat daftar lagu");
      showInputPage();
      return;
    }
    setLocalData("songListRandom", selectedSongs);
    console.log("cookie songListItem disetel", selectedSongs);
    // showResultPage();
    showOptionShuffle();
  }, 1000);
  448;
}

function showResultPage() {
  let i = 1;
  const selectedSongs = getLocalData("songListRandom");
  app.innerHTML = `
          <h1>Daftar Lagu</h1>
          <table style="text-align: left; margin: 0 auto; text-transform: capitalize">
              <tr>
                  <th style="text-align: left; width: 50px">No</th>
                  <th style="text-align: left; width: 50px">Seri</th>
                  <th>Anime</th>
                  <th>Judul</th>
              </tr>
              ${selectedSongs
                .map(
                  (song) => `
                  <tr>
                      <td style="text-align: left; width: 30px">${i++}</td>
                      <td>${geInfoSong(song.title, 0)}</td>
                      <td>${geInfoSong(song.title, 1)}</td>
                      <td>${geInfoSong(song.title, 2)}</td>
                  </tr>
              `
                )
                .join("")}
          </table>
          <button onclick="showMainMenu(); playClickSound('back');" class="btn btn-primary btn-lg">Kembali</button>
      `;
}

window.showOptionShuffle = showOptionShuffle;
window.confirmProceed = confirmProceed;
window.proceedToShuffle = proceedToShuffle;
window.showResultPage = showResultPage;
window.showInputPage = showInputPage;

export { showOptionShuffle, confirmProceed, showResultPage, showInputPage };
