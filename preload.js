const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('mainBridge', {
  getLocalFileContents: () => ipcRenderer.sendSync('getLocalFileContents')
});
