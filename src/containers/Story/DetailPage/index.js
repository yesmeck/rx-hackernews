import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'

class DetailPage extends Component {
  componentWillMount() {
    const { dispatch, story, params: { id } }  = this.props
    if (!story) {
      dispatch()
    }
  }

  render () {
    const { story } = this.props

    return story ? <Item story={story} /> : null
  }
}

export default connect((state, props) => ({
}))(DetailPage)
