import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { timeAgo } from '../../helpers'
import './style.css'

export function pluralize(time) {
  if (time === 1) {
    return time + ' reply'
  }
  return time + ' replies'
}

class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  componentWillMount() {
    const { dispatch, story, id }  = this.props
    if (!story) {
      dispatch({ type: 'story/top/fetchOne', payload: id });
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { open } = this.state
    const { comment } = this.props

    if (!comment) {
      return null
    }

    let openLink = null
    let comments = null

    if (comment.kids && comment.kids.length > 0) {
      openLink = (
        <span>
          | <a className="expand" onClick={this.handleClick}>
            {open ? 'collapse ' : 'expand ' + pluralize(comment.kids.length)}
          </a>
        </span>
      )
    }

    if (open) {
      comments = (
        <ul className="comment-children">
          {comment.kids.map(id => <ConnectedComment key={id} id={id} />)}
        </ul>
      )
    }

    return (
      <li className="comment">
        <div className="by">
          <Link to={`/users/${comment.by}`}>{comment.by}</Link>
          {timeAgo(comment.time)} ago
          {openLink}
        </div>
        <div className="text" dangerouslySetInnerHTML={{__html: comment.text}} />
        {comments}
      </li>
    )
  }
}

const ConnectedComment = connect((state, { id }) => ({
  comment: state.entity.story[id]
}))(Comment)

export default ConnectedComment;
