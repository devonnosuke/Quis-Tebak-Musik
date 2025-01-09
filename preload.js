const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronCookies", {
  setCookie: (name, value, expirationDays) =>
    ipcRenderer.send("set-cookie", { name, value, expirationDays }),
  getCookie: (name) => ipcRenderer.invoke("get-cookie", name),
});

contextBridge.exposeInMainWorld("electronAPI", {
  closeApp: () => ipcRenderer.send("close-app"),
});
