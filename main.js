const electron = require("electron");
const app = electron.app;
const browserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

const ipc = electron.ipcMain;

const dialog = electron.dialog;

let win;
// let child;

function createWindow() {
  win = new browserWindow({
    title: "parent",
    webPreferences: { nodeIntegration: true }
  });
  // child = new browserWindow({
  //   modal: true,

  //   title: "child",
  //   width: 500,
  //   height: 150,
  //   parent: win,
  //   frame: false,
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   show: false
  // });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: "true"
    })
  );

  // child.loadURL("http://anurag-shopping-list.herokuapp.com/");

  // child.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, "child.html"),
  //     protocol: "file",
  //     slashes: "true"
  //   })
  // );

  // child.once("ready-to-show", () => {
  //   child.show();
  // });

  win.webContents.openDevTools();
  // child.webContents.openDevTools();

  // child.show();
  // win.show();

  win.on("closed", () => {
    win = null;
  });

  // child.on("closed", () => {
  //   child = null;
  // });
}

ipc.on("async-msg", function(event) {
  // dialog.showErrorBox("an error message", "demo of error");
  event.sender.send("async-reply", "main process opened error message");
});

ipc.on("sync-msg", function(event) {
  event.returnValue = "sync-reply";
});

app.on("ready", createWindow);
