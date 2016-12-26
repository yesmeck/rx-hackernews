import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'

class DetailPage extends Component {
  componentWillMount() {
    const { dispatch, user, params: { id } } = this.props
    if (!user) {
      dispatch({ type: 'user/fetch', payload: id });
    }
  }

  render() {
    const { user } = this.props

    return (
      user ? <Item user={user} /> : null
    )
  }
}

export default connect((state, { params }) => ({
  user: state.entity.user[params.id]
}))(DetailPage)
