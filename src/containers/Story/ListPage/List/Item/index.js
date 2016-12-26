import React from 'react'
import { Link } from 'react-router'
import { host, timeAgo } from '../../../../../helpers'
import './style.css'

export default function Item({ story }) {
  let title = null
  let author = null
  let commentLink = null
  let label = null

  if (story.url) {
    title = (
      <span className="title">
        <a href={story.url} target="_blank">{story.title}</a>
        <span className="host">({host(story.url)})</span>
      </span>
    )
  } else {
    title = (
      <span className="title">
        <Link to={`/items/${story.id}`}>{story.title}</Link>
      </span>
    )
  }

  if (story.type !== 'job') {
    author = (
      <span className="by">
        by <Link to={`/users/${story.by}`} className="">{story.by}</Link>
      </span>
    )

    commentLink = (
      <span className="comments-link">
        | <Link to={`/items/${story.id}`}>{story.descendants} comments</Link>
      </span>
    )
  }

  if (story.type !== 'story') {
    label = <span className="label"> {story.type}</span>
  }

  return (
    <li className="news-item">
      <span className="score">{story.score}</span>
      {title}
      <br />
      <span className="meta">
        {author}
        <span className="time">
          {timeAgo(story.time)} ago
        </span>
        {commentLink}
      </span>
      {label}
    </li>
  )
}
