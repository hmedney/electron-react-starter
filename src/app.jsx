import React from 'react';
import {Router, Link, createMemorySource, createHistory, LocationProvider} from '@reach/router';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import 'bootstrap/dist/css/bootstrap.min.css';

// use memory-based history for routing in Electron
const history = createHistory(createMemorySource());

// dummy pages
const Home = () => <div>Home</div>;
const NotFound = ({location}) => (
  <div className="alert-danger p-3">
    Path not found: <strong>{location.pathname}</strong>
  </div>
);

// Bootstrap nav link with active class
const NavLink = ({label, path}) => (
  <li className="nav-item">
    <Link
      to={path}
      getProps={({isCurrent}) => {
        return {
          className: `nav-link${isCurrent ? ' active' : ''}`
        };
      }}
    >
      {label}
    </Link>
  </li>
);

// main
export default () => (
  <>
    {/* wrap all Routes and Links in LocationProvider to use memory-based history */}
    <LocationProvider history={history}>
      {/* Bootstrap navbar */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">
          Electron Starter
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <NavLink path="page1" label="Page 1" />
            <NavLink path="page2" label="Page 2" />
          </ul>
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
