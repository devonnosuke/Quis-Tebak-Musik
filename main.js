const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { dialog } = require("electron");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "favicon.ico"),
  });

  mainWindow.loadFile(path.join(__dirname, "app", "index.html"));

  // Fokuskan jendela saat siap
  // mainWindow.webContents.once("did-finish-load", () => {
  //   mainWindow.focus();
  //   mainWindow.webContents.focus(); // Fokus pada konten jendela
  // });

  // mainWindow.setAlwaysOnTop(true); // Pastikan jendela di atas
  // setTimeout(() => mainWindow.setAlwaysOnTop(false), 3000000); // Matikan setelah 500ms
});

ipcMain.on("close-app", (event) => {
  const response = dialog.showMessageBoxSync({
    type: "question",
    buttons: ["Yes", "No"],
    title: "Konfirmasi",
    message: "Yakin Ingin Keluar?",
  });

  if (response === 0) {
    app.quit();
  }
});

ipcMain.on("refocus-window", () => {
  mainWindow.blur(); // Nonaktifkan jendela
  setTimeout(() => {
    mainWindow.focus(); // Fokuskan kembali
  }, 10);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
