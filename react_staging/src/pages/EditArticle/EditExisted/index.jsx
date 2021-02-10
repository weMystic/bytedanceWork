import React, { Component } from 'react'
import "./index.css"
import Edit from '../../../components/Edit'
export default class EditExisted extends Component {
  render() {
    const { articleId } = this.props.match.params
    return (
      <div className="main-container">
        <h3>文章编辑</h3>
        <Edit articleId={articleId}/>
      </div>
    )
  }
}
