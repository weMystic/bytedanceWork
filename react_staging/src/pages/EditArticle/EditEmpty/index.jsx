import React, { Component } from 'react'
import "./index.css"
import Edit from '../../../components/Edit'
export default class EditEmpty extends Component {
  render() {
    const { newArticleId } = this.props.match.params
    // console.log(this.props.match.params);
    return (
      <div className="main-container">
        <h3>文章录入</h3>
        <Edit newArticleId={newArticleId}/>
      </div>
    )
  }
}