const electron = require("electron");
const app = electron.app;
const browserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

const ipc = electron.ipcMain;

const dialog = electron.dialog;
const globalShortcuts = electron.globalShortcut;

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

// ipc.on("async-msg", function(event) {
//   // dialog.showErrorBox("an error message", "demo of error");
//   event.sender.send("async-reply", "main process opened error message");
// });

// ipc.on("sync-msg", function(event) {
//   event.returnValue = "sync-reply";
// });

app.on("ready", function() {
  createWindow();
  const template = [
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "demo",
      submenu: [
        {
          label: "submenu1",
          click: function() {
            console.log("clicked submenu 1");
          }
        },
        {
          type: "separator"
        },
        {
          label: "submenu2"
        }
      ]
    },
    {
      label: "help",
      submenu: [
        {
          label: "about electron",
          click: function() {
            electron.shell.openExternal("http://electron.atom.io");
          },
          accelerator: "CmdOrCtrl + Shift + H"
        }
      ]
    },
    {
      label: "developer",
      click: function() {
        win.webContents.openDevTools();
      },
      accelerator: "F11"
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const ctxMenu = new Menu();
  ctxMenu.append(
    new MenuItem({
      label: "hello",
      click: function() {
        console.log("context menu item clicked");
      }
    })
  );
  ctxMenu.append(new MenuItem({ role: "selectAll" }));

  win.webContents.on("context-menu", function(e, params) {
    ctxMenu.popup(win, params.x, params.y);
  });

  globalShortcuts.register("Alt + 1", function() {
    win.show();
  });
});
