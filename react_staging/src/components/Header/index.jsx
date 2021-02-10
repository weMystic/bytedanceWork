import React, { Component } from 'react'
import MyNavLink from "../MyNavLink"
import './index.css'
export default class Header extends Component {
  render() {
    const { active1,active2 } = this.props
    return (
      <div className="header">
        <MyNavLink style={{active1}} to="/editArticle">编辑</MyNavLink>
        <MyNavLink style={{active2}} to="/articleOnlineList">浏览</MyNavLink>
      </div>
    )
  }
}
