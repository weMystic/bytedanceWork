import React, { Component } from "react";
import {Link} from 'react-router-dom'
import "./index.css";
export default class Item extends Component {
  render() {
    // console.log(this.props);
    const { articleId, title, source, updatedAt } = this.props;
    return (
      <div className="essay-box">
        <Link to={`/article/${articleId}`} className="title-box" target="_blank">
          {articleId}.{title}
        </Link>
        <div className="footer-bar">
          <span className="source-box">{source}</span>
          &nbsp;{updatedAt}
        </div>
      </div>
    );
  }
}
