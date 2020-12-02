import React, { Component } from 'react';
import  './index.module.scss';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="mv-btn-group">
        <a className="mv-btn" href="/">
          <i>
            <em className="icn-praise"></em>(
            {this.props.likedCount})
          </i>
        </a>
        <a className="mv-btn fav" href="/">
          <i>({this.props.subCount})</i>
        </a>
        <a className="mv-btn share" href="/">
          <i>({this.props.shareCount}) </i>
        </a>
      </div>
    );
  }
}
