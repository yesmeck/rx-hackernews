import React from 'react'
import { Link } from 'react-router'
import { host, timeAgo } from '../../../../helpers'
import { Comment } from '../../../../components'
import './style.css'

export default function Item({ story }) {
  let title = null
  let hostSpan = null
  let comments = null

  if (story.url) {
    title = (
      <a href={story.url} target="_blank">
        <h1>{story.title}</h1>
      </a>
    )

    hostSpan = (
      <span className="host">
        ({host(story.url)})
      </span>
    )
  } else {
    title = <h1>{story.title}</h1>
  }

  if (story.kids) {
    comments = (
      <ul className="comment-children">
        {story.kids.map(id => <Comment key={id} id={id} />)}
      </ul>
    )
  }

  return (
    <div className="item-view view">
      <div className="item-view-header">
        {title}
        {hostSpan}
        <p className="meta">
          {story.score} points
          | by <Link to={`/users/${story.by}`}>{story.by}</Link>
          {timeAgo(story.time)} ago
        </p>
      </div>
      <div className="item-view-comments">
        <p className="item-view-comments-header">
          {story.kids ? story.descendants + ' comments' : 'No comments yet.'}
        </p>
        {comments}
      </div>
    </div>
  )
}
