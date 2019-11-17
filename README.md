# Electron starter with create-react-app and reach-router
Electron, create-react-app, and reach-router coexisting in harmony.

## Notable
### Main
Main process is launched via `main.js`.  This accepts a command-line argument to override start url for the main window.  See `dev:main` npm script which loads the local webpack dev server (http://localhost:3000).

### Renderer
Render process loads a web page created by [create-react-app](https://create-react-app.dev/) for config-less and familiar React environment.  At dev-time, the Webpack dev server is used, at run-time, the built site is used.

### Reach Router
Routing within the app is done using [Reach Router](https://reach.tech/router).  The main tweak was to use a memory-based LocationProvider to enable routing when loading `index.html` from the file system.

### Node access
[BrowserWindow](https://electronjs.org/docs/api/browser-window) is loaded with `nodeIntegration` enabled which enables loading Node modules from within the frontend code.  See `/src/components/Page2.jsx` for an example.

```javascript
import React from 'react';

const {remote} = window.require('electron');
const path = window.require('path');
const fsx = window.require('fs-extra');

export default () => {
  const dataFile = path.resolve(remote.app.getAppPath(), 'src/data/hello-world.json');
  const data = fsx.readJSONSync(dataFile);
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
```