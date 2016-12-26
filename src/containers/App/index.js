import React, { PropTypes } from 'react';
import TransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import './style.css'
import logo from './logo.png'

const types = {
  top: 'Top',
  new: 'New',
  show: 'Show',
  ask: 'Ask',
  job: 'Jobs',
}

export default function App({ location, children }) {
  const links = Object.keys(types).map(key => {
    const path = `/${key}`
    const active = location.pathname.indexOf(path) === 0
    const className = active ? "router-link-active" : ""
    return <Link key={key} to={path} className={className}>{types[key]}</Link>
  })

  return (
    <div id="app">
      <div className="header">
        <div className="inner">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          {links}
          <a href="https://github.com/yesmeck/rx-hackernews" target="_blank" className="github">
            Source
          </a>
        </div>
      </div>
      <TransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {children}
      </TransitionGroup>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}
