const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;

const { autoUpdater } = require("electron-updater");


let mainWindow;

function sendStatusUpdate(text) {
  mainWindow.webContents.send('message', text);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 640,
    height: 480
  });
  mainWindow.loadURL(`file://${__dirname}/index.html#v${app.getVersion()}`);
 
  mainWindow.webContents.openDevTools();

  mainWindow.on("close", () => {
    mainWindow.webContents.send("stop-server");
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}


app.on("ready", createWindow);

app.on("browser-window-created", function (e, window) {
  window.setMenu(null);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});


//Check for updates
autoUpdater.on('checking-for-update', () => {
  sendStatusUpdate('Checking for update...');
})

autoUpdater.on('update-available', (info) => {
  sendStatusUpdate('Update available.');
})

autoUpdater.on('update-not-available', (info) => {
  sendStatusUpdate('Update not available.');
})

autoUpdater.on('error', (err) => {
  sendStatusUpdate('Error in auto-updater. ' + err);
})

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusUpdate(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusUpdate('Update downloaded');
});


app.on("ready", function(){
  autoUpdater.checkForUpdatesAndNotify();
})