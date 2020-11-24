require('dotenv').config();
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// expose remote to render process
require('@electron/remote/main').initialize();

let win;

function createWindow() {
  const urlArg = process.argv[2];

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
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
