import React from 'react';
import {Router, Link, createHistory, LocationProvider} from '@reach/router';
import createHashSource from 'hash-source';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import 'bootstrap/dist/css/bootstrap.min.css';

// use memory-based history for routing in Electron
const history = createHistory(createHashSource());

// dummy pages
function Home() {
  return <div>Home</div>;
}
function NotFound({location}) {
  return (
    <div className="alert-danger p-3">
      Path not found: <strong>{location.pathname}</strong>
    </div>
  );
}

// Bootstrap nav link with active class
function NavLink({label, path}) {
  return (
    <li className="nav-item">
      <Link
        to={path}
        getProps={({isCurrent}) => ({
          className: `nav-link${isCurrent ? ' active' : ''}`
        })}
      >
        {label}
      </Link>
    </li>
  );
}

// main
export default function App() {
  return (
    <>
      {/* wrap all Routes and Links in LocationProvider to use memory-based history */}
      <LocationProvider history={history}>
        {/* Bootstrap navbar */}
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <div class="container-fluid">
            <Link className="navbar-brand" to="/">
              Electron Starter
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <NavLink path="page1" label="Page 1" />
                <NavLink path="page2" label="Page 2" />
              </ul>
            </div>
          </div>
        </nav>

        {/* body */}
        <div style={{paddingTop: '4rem', paddingLeft: '.5rem', paddingRight: '1rem'}}>
          {/* reach router */}
          <Router>
            <Home path="/" />
            <Page1 path="page1" />
            <Page2 path="page2" />
            <NotFound default />
          </Router>
        </div>
      </LocationProvider>
    </>
  );
}
