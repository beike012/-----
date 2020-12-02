import React, { Component } from 'react';
import styles from './index.module.scss';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  getPlayCount(num) {
    // 大于十万的转换
    if (num < 100000) {
      return num;
    } else {
      return Math.floor(num / 10000) + '万';
    }
  }
  handleClick = (vid,e) => {
    e.preventDefault()
    this.props.history.push(`/Video/${vid}`);
    window.location.reload()
  };
  render() {
    return (
      <div className={styles['mv-right-wrap']}>
        <span className={styles['mv-right-title']}>相关推荐</span>
        <ul>
          {this.props.relatedVideo.map((item, index) => {
            return (
              <li key={index}>
                <div
                  className={styles['relate-left']}
                  onClick={(e)=>{this.handleClick(item.vid,e)}}
                >
                  <img src={item.coverUrl} alt="" />
                  <p>
                    <i></i>
                    {this.getPlayCount(item.playTime)}
                  </p>
                </div>
                <div className={styles['relate-right']}>
                  <a
                    href="/"
                    className={styles['relate-right-title']}
                    title={item.title}
                    onClick={(e)=>{this.handleClick(item.vid,e)}}
                  >
                    {item.title}
                  </a>
                  <p>{item.durationms}</p>
                  <p>
                    by <a href="/">{item.creator[0].userName}</a>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
