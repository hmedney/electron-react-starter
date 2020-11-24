import React, {useEffect, useState} from 'react';

const {ipcRenderer} = window.require('electron');
const path = window.require('path');
const fsx = window.require('fs-extra');

// normally this would be done with electron.remote, but remote has been deprecated
async function getAppPath() {
  return ipcRenderer.invoke('get-app-path');
}

async function loadFile() {
  const appPath = await getAppPath();
  const dataFile = path.resolve(appPath, 'src/data/hello-world.json');
  return fsx.readJSON(dataFile);
}

export default () => {
  const [data, setData] = useState();
  useEffect(() => {
    loadFile().then((result) => setData(result));
  });

  if (data == null) {
    return 'Loading...';
  }

  return (
    <div className="card w-50">
      <div className="card-header">Loaded from local file:</div>
      <div className="card-body">
        <small>
          <pre className="m-0">{JSON.stringify(data, null, 2)}</pre>
        </small>
      </div>
    </div>
  );
};
