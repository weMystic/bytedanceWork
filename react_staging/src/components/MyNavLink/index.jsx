import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'
export default class MyNavLink extends Component {
  render() {
    return (
      <div>
        <NavLink className="MyNavLink" {...this.props}/>
      </div>
    )
  }
}
