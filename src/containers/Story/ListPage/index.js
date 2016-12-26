import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as story from '../../../modules/story'
import List from './List'
import { PAGE_SIZE } from '../../../config/constants';

export default function createListPage(type) {
  class ListPage extends Component {
    componentWillMount() {
      this.props.dispatch({ type: `story/${type}/watch` })
    }

    componentWillUnmount() {
      this.props.dispatch({ type: `story/${type}/cancelWatch` })
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
    stories: story.selectList(state, type, props.params.page),
    maxPage: state.story[type].ids.length / PAGE_SIZE,
    loading: state.story[type].loading,
  }))(ListPage)
}
