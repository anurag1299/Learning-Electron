console.log("I am Main");

// const electron = require("electron");
// const ipc = electron.ipcRenderer;

// const errorbtn = document.getElementById("asyncBtn");

// errorbtn.addEventListener("click", function() {
//   console.log("async msg 1");
//   ipc.send("async-msg");
//   console.log("async msg 2");
// });

// const syncBtn = document.getElementById("syncBtn");

// syncBtn.addEventListener("click", function() {
//   console.log("sync msg 1");
//   const reply = ipc.sendSync("sync-msg");
//   console.log(reply);
//   console.log("sync msg 2");
// });

// ipc.on("async-reply", function(event, arg) {
//   console.log(arg);
// });

// const openBtn = document.getElementById("openBtn");
// const shell = require("electron").shell;

// openBtn.addEventListener("click", function(event) {
//   shell.showItemInFolder("./sample.txt");
//   shell.openItem("./electron.png");
//   shell.openExternal("http://electron.atom.io");
// });
