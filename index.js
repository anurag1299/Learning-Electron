console.log("I am Main");

const electron = require("electron");
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

const fs = require("fs");
const path = require("path");
const { ipcRenderer } = require("electron");
const dialog = require("electron").remote.dialog;

btnRead = document.getElementById("btnRead");

btnCreate = document.getElementById("btnCreate");
btnDelete = document.getElementById("btnDelete");
fileName = document.getElementById("fileName");
fileContents = document.getElementById("fileContents");

let pathName = path.join(__dirname, "Files");

btnCreate.addEventListener("click", function() {
  // let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;
  // fs.writeFile(file, contents, function(err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("The file was created");
  // });
  ipcRenderer.send("saveFile", () => {
    console.log("Save event");
  });
  ipcRenderer.on("saveSelected", (event, path) => {
    fs.writeFile(path, contents, function(err) {
      if (err) {
        dialog.showErrorBox("error", "" + err);
      } else {
        dialog.showMessageBox(null, {
          title: "Success",
          buttons: ["OK"],
          message: "The file was created"
        });
      }
    });
  });
});

btnRead.addEventListener("click", function() {
  // let file = path.join(pathName, fileName.value);

  // fs.readFile(file, function(err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   fileContents.value = data;
  //   console.log("The file was read");
  // });
  ipcRenderer.send("openFile", () => {
    console.log("open sent");
  });

  ipcRenderer.on("fileData", (event, obj) => {
    // document.write(data);
    fileContents.value = obj.data;
    // fileName.value = obj.filepath;
  });
});

btnDelete.addEventListener("click", function() {
  let file = path.join(pathName, fileName.value);

  fs.unlink(file, function(err) {
    if (err) {
      return console.log(err);
    }
    fileName.value = "";
    fileContents.value = "";
    console.log("The file was deleted");
  });
});
