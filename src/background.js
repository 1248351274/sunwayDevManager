// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
mainWindow = new BrowserWindow({
  width: 1400,
  height: 800,
  // frame:false,
  webPreferences: {
    /*preload: path.join(__dirname, 'preload.js')*/
    nodeIntegration: true
  }
})

  // and load the index.html of the app.
var ret =  mainWindow.loadFile('./public/task.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
let ipcMain = require('electron').ipcMain;
//接收最小化命令
ipcMain.on('window-min', function() {
    mainWindow.minimize();
})
//接收最大化命令
ipcMain.on('window-max', function() {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
    } else {
        mainWindow.maximize();
    }
})
//接收关闭命令
ipcMain.on('window-close', function() {
    mainWindow.close();
})
