console.log("I am Main");

const electron = require("electron");
const ipc = electron.ipcRenderer;

const errorbtn = document.getElementById("errorButton");

errorbtn.addEventListener("click", function() {
  ipc.send("open-error-dialog");
});
