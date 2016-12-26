import React from 'react'
import { timeAgo } from '../../../../helpers'
import './style.css'

export default function Item({ user }) {
  let about = null

  if (user.about) {
    about = (
      <li className="about" dangerouslySetInnerHTML={{__html: user.about}} />
    )
  }

  return (
    <div className="view">
      <div className="user-view">
        <h1>User : {user.id}</h1>
        <ul className="meta">
          <li><span className="label">Created:</span> {timeAgo(user.created)} ago</li>
          <li><span className="label">Karma:</span> {user.karma}</li>
          {about}
        </ul>
        <p className="links">
          <a href={`https://news.ycombinator.com/submitted?id=${user.id}`}>submissions</a> |
          <a href={`https://news.ycombinator.com/threads?id=${user.id}`}>comments</a>
        </p>
      </div>
    </div>
  )
}
