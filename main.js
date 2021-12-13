require('dotenv').config();
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fsx = require('fs-extra');
const url = require('url');

let win;

function createWindow() {
  const urlArg = process.argv[2];

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const startUrl =
    urlArg ||
    url.format({
      pathname: path.resolve(__dirname, 'build/index.html'),
      protocol: 'file:',
      slashes: true
    });

  win.loadURL(startUrl);
  win.setMenuBarVisibility(false);
  win.autoHideMenuBar = true;

  win.on('closed', () => {
    win = null;
  });
}

// provide base path to renderer
ipcMain.on('getLocalFileContents', (event) => {
  const dataFile = path.resolve(__dirname, 'src/data/hello-world.json');
  const data = fsx.readJSONSync(dataFile);
  event.returnValue = data;
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
