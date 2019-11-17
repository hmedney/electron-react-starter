require('dotenv').config();
const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow} = electron;
let win;

function createWindow() {
  const urlArg = process.argv[2];

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
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
  win.webContents.openDevTools();

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
