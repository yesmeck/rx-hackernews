import React from 'react'
import { Link } from 'react-router'
import { host, timeAgo } from '../../../../../helpers'
import './style.css'

export default function Item({ story }) {
  let title = null
  let author = null
  let commentLink = null
  let label = null

  if (story.get('url')) {
    title = (
      <span className="title">
        <a href={story.get('url')} target="_blank">{story.get('title')}</a>
        <span className="host">({host(story.get('url'))})</span>
      </span>
    )
  } else {
    title = (
      <span className="title">
        <Link to={`/items/${story.get('id')}`}>{story.get('title')}</Link>
      </span>
    )
  }

  if (story.get('type') !== 'job') {
    author = (
      <span className="by">
        by <Link to={`/users/${story.get('by')}`} className="">{story.get('by')}</Link>
      </span>
    )

    commentLink = (
      <span className="comments-link">
        | <Link to={`/items/${story.get('id')}`}>{story.get('descendants')} comments</Link>
      </span>
    )
  }

  if (story.get('type') !== 'story') {
    label = <span className="label"> {story.get('type')}</span>
  }

  return (
    <li className="news-item">
      <span className="score">{story.get('score')}</span>
      {title}
      <br />
      <span className="meta">
        {author}
        <span className="time">
          {timeAgo(story.get('time'))} ago
        </span>
        {commentLink}
      </span>
      {label}
    </li>
  )
}
