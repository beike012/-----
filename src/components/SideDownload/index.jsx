import React, { Component } from 'react';
import styles from './index.module.scss';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles['mv-right-wrap']}>
          <span className={styles['mv-right-title']}>网抑云音乐多端下载</span>
          <div className={styles['download-group']}>
            <i className={styles['ios']}></i>
            <i className={styles['windows']}></i>
            <i className={styles['android']}></i>
          </div>
          <p className={styles['download-tips']}>
            同步歌单，随时畅听320k好音乐
          </p>
        </div>
        <div className={styles['mv-right-wrap']}>
          <span className={styles['mv-right-title']}>网抑云音乐公众号</span>
          <div className={styles['code-wrap']}>
            <div className={styles['code']}></div>
            <div className={styles['code-text']}>
              关注我，我们才能 真正拥有彼此啊~
            </div>
          </div>
        </div>
      </div>
    );
  }
}
