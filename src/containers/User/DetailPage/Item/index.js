import React from 'react'
import { timeAgo } from '../../../../helpers'
import './style.css'

export default function Item({ user }) {
  let about = null

  if (user.get('about')) {
    about = (
      <li className="about" dangerouslySetInnerHTML={{__html: user.get('about')}} />
    )
  }

  return (
    <div className="view">
      <div className="user-view">
        <h1>User : {user.get('id')}</h1>
        <ul className="meta">
          <li><span className="label">Created:</span> {timeAgo(user.get('created'))} ago</li>
          <li><span className="label">Karma:</span> {user.get('karma')}</li>
          {about}
        </ul>
        <p className="links">
          <a href={`https://news.ycombinator.com/submitted?id=${user.get('id')}`}>submissions</a> |
          <a href={`https://news.ycombinator.com/threads?id=${user.get('id')}`}>comments</a>
        </p>
      </div>
    </div>
  )
}
