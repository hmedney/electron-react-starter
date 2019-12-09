# Electron starter with create-react-app and Reach Router
[Electron](https://electronjs.org/), [create-react-app](https://create-react-app.dev/), and [Reach Router](https://reach.tech/router) in harmony.
Starter project is intended to be minimal yet cover key integration scenarios.  [Bootstrap](https://getbootstrap.com/) is used as the UI framework.

## Usage
For development, start the following in separate terminals:
```bash
# start React dev server (open in terminal 1)
yarn dev:react

# start Electron app (open in terminal 2)
yarn dev:main
```

For prod, run:
```bash
# build react app
yarn build

# start Electron and load prod react app
yarn start
```

## About
### Main
Main process is launched via `main.js` and accepts a command-line argument to override start url for the main window.  See `dev:main` npm script which loads the local webpack dev server at http://localhost:3000.

### React
Render process loads a web page created by create-react-app for a config-less and familiar React environment.  At dev-time, the Webpack dev server is used, at run-time, the built site is used.

### Reach Router
Routing within the app is done using Reach Router.  The main tweak was to use url [hash history](https://www.npmjs.com/package/hash-source) and LocationProvider to enable routing when loading `index.html` from the file system.

### Node access
[BrowserWindow](https://electronjs.org/docs/api/browser-window) is created with `nodeIntegration` enabled which enables loading Node modules from within the frontend code.

Example:
```javascript
import React from 'react';

const {remote} = window.require('electron');
const path = window.require('path');
const fsx = window.require('fs-extra');

export default () => {
  const dataFile = path.resolve(remote.app.getAppPath(), 'src/data/hello-world.json');
  const data = fsx.readJSONSync(dataFile);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
```
Also see [src/components/Page2.jsx](/src/components/Page2.jsx)
