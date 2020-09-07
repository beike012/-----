import React, { Component } from 'react';
import {
  getMvUrl,
  getMvDetail,
  getMvDetailInfo,
  getRelatedVideo
} from '@/api/mv';
import TopMenu from '@/components/TopMenu';
import styles from './index.module.scss';
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoSrc: '',
      isMuted: true,
      mvDetail: {},
      mvDetailInfo: {},
      relatedVideo: []
    };
  }
  componentDidMount() {
    this.getMvUrlFn();
    this.getMvDetailFn();
    this.getMvDetailInfoFn();
    this.getRelatedVideoFn();
  }
  async getMvUrlFn() {
    const res = await getMvUrl(this.props.match.params.mvid || '');
    this.setState({
      videoSrc: res.data.url
    });
  }
  async getMvDetailFn() {
    const res = await getMvDetail(this.props.match.params.mvid || '');
    this.setState({
      mvDetail: res.data
    });
  }
  async getMvDetailInfoFn() {
    const res = await getMvDetailInfo(this.props.match.params.mvid || '');
    this.setState({
      mvDetailInfo: res
    });
  }
  async getRelatedVideoFn() {
    const res = await getRelatedVideo(this.props.match.params.mvid || '');
    this.setState({
      relatedVideo: res.data
    });
  }
  getPlayCount(num) {
    // 大于十万的转换
    if (num < 100000) {
      return num;
    } else {
      return Math.floor(num / 10000) + '万';
    }
  }
  render() {
    return (
      <div className={styles['mv-outer-wrap']}>
        <TopMenu history={this.props.history}></TopMenu>
        <div className={styles['mv-main-content']}>
          <div className={styles['mv-left-content']}>
            <div className={styles['mv-title']}>
              <i></i>
              <div className={styles['mv-title-div']}>
                <h2>{this.state.mvDetail.name}</h2>
                <a className={styles['mv-title-a']} href="/">
                  {this.state.mvDetail.artistName}
                </a>
              </div>
            </div>
            <video autoPlay controls src={this.state.videoSrc}></video>
            <div className="mv-btn-group">
              <a className="mv-btn" href="/">
                <i>
                  <em className="icn-praise"></em>(
                  {this.state.mvDetailInfo.likedCount})
                </i>
              </a>
              <a className="mv-btn fav" href="/">
                <i>({this.state.mvDetail.subCount})</i>
              </a>
              <a className="mv-btn share" href="/">
                <i>({this.state.mvDetail.shareCount}) </i>
              </a>
            </div>
            <div className={styles['comment-wrap']}>
              <div className={styles['comment-title']}>
                <h2>评论</h2>
                <span>共{this.state.mvDetail.commentCount}条评论</span>
              </div>
              <div className={styles['comment-hot']}>
                <p>
                  为什么他这样坚持走下去，这样不羁的追求音乐，内心所有的呐喊都在这首歌里面了，希望爱他的人都能在这首歌里面听到家驹曾经的心声。。。
                </p>
                <p>耶耶耶!</p>
              </div>
            </div>
          </div>
          <div className={styles['mv-right-content']}>
            <div className={styles['mv-right-wrap']}>
              <span className={styles['mv-right-title']}>MV简介</span>
              <p>发布时间：{this.state.mvDetail.publishTime}</p>
              <p>
                播放次数：{this.getPlayCount(this.state.mvDetail.playCount)}次
              </p>
            </div>
            <div className={styles['mv-right-wrap']}>
              <span className={styles['mv-right-title']}>相关推荐</span>
              <ul>
                {this.state.relatedVideo.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className={styles['relate-left']}>
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
          </div>
        </div>
      </div>
    );
  }
}
