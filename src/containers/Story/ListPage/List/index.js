import React, { Component } from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import { Placeholder } from '../../../../components'
import Item from './Item'
import './style.css'

export default class List extends Component {
  constructor(props) {
    super(props)

    this.page = +(props.page || 1)
    this.transition = 'slide-left'
  }

  componentWillReceiveProps(nextProps) {
    const nextPage = +(nextProps.page || 1)
    if (nextPage > this.page) {
      this.transition = 'slide-left'
    } else {
      this.transition = 'slide-right'
    }
    this.page = nextPage
  }

  render() {
    const { type, stories, maxPage, loading } = this.props

    let prev = null
    let more = null
    let items = null


    if (this.page > 1) {
      prev = <Link to={`/${type}/${this.page - 1}`}>&lt; prev</Link>
    } else {
      prev = <a className="disabled">&lt; prev</a>
    }

    if (this.page < maxPage) {
      more = <Link to={`/${type}/${this.page + 1}`}>more &gt;</Link>
    } else {
      more = <a className="disabled">more &gt;</a>
    }

    if (stories.length <= 0 && loading) {
      items = (
        <ul>
          {Array(20).fill(1).map((_, i) => <Placeholder key={i} />)}
        </ul>
      )
    } else {
      items = (
        <TransitionGroup
          component="ul"
          transitionName="item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {stories.map(story => <Item key={story.id} story={story} />)}
        </TransitionGroup>
      )
    }

    return (
      <div className="news-view view">
        <div className="news-list-nav">
          {prev}
          <span>{this.page || 1}/{maxPage}</span>
          {more}
        </div>
        <TransitionGroup
          transitionName={this.transition}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <div key={this.page} className="news-list">
            {items}
          </div>
        </TransitionGroup>
      </div>
    )
  }
}
