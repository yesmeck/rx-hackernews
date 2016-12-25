import React from 'react'
import { Link } from 'react-router'
import { host, timeAgo } from '../../../../helpers'
import { Comment } from '../../../../components'
import './style.css'

export default function Item({ story }) {
  let title = null
  let hostSpan = null
  let comments = null

  if (story.get('url')) {
    title = (
      <a href={story.get('url')} target="_blank">
        <h1>{story.get('title')}</h1>
      </a>
    )

    hostSpan = (
      <span className="host">
        ({host(story.get('url'))})
      </span>
    )
  } else {
    title = <h1>{story.get('title')}</h1>
  }

  if (story.get('kids')) {
    comments = (
      <ul className="comment-children">
        {story.get('kids').map(id => <Comment key={id} id={id} />)}
      </ul>
    )
  }

  return (
    <div className="item-view view">
      <div className="item-view-header">
        {title}
        {hostSpan}
        <p className="meta">
          {story.get('score')} points
          | by <Link to={`/users/${story.get('by')}`}>{story.get('by')}</Link>
          {timeAgo(story.get('time'))} ago
        </p>
      </div>
      <div className="item-view-comments">
        <p className="item-view-comments-header">
          {story.get('kids') ? story.get('descendants') + ' comments' : 'No comments yet.'}
        </p>
        {comments}
      </div>
    </div>
  )
}
