import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'

class DetailPage extends Component {
  componentWillMount() {
    const { dispatch, user, params: { id } } = this.props
    if (!user) {
      dispatch()
    }
  }

  render() {
    const { user } = this.props

    return (
      user ? <Item user={user} /> : null
    )
  }
}

export default connect((state, props) => ({
}))(DetailPage)
