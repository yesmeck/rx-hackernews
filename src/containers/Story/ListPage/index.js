import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as story from '../../../modules/story'
import List from './List'

export default function createListPage(type) {
  class ListPage extends Component {
    componentWillMount() {
      this.props.dispatch({ type: 'story/watch' })
    }

    componentWillUnmount() {
      this.props.dispatch({ type: 'story/cancelWatch' })
    }

    render() {
      const { stories = [], maxPage, loading, params: { page } } = this.props

      return (
        <List
          type={type}
          stories={stories}
          page={page}
          maxPage={maxPage}
          loading={loading}
        />
      )
    }
  }

  return connect((state, props) => ({
    stories: story.selectList(state, props.params.page)
  }))(ListPage)
}
