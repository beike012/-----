import React, { Component } from 'react';
import {
  getMvUrl,
  getMvDetail,
  getMvDetailInfo,
  getRelatedVideo,
  getMVComment
} from '@/api/mv';
import TopMenu from '@/components/TopMenu';
import styles from './index.module.scss';
import { Pagination } from 'antd';
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoSrc: '',
      isMuted: true,
      mvDetail: {},
      mvDetailInfo: {},
      relatedVideo: [],
      comments: [],
      hotComments: [],
      currentPage: 1
    };
  }
  componentDidMount() {
    this.getMvUrlFn();
    this.getMvDetailFn();
    this.getMvDetailInfoFn();
    this.getRelatedVideoFn();
    this.getMVCommentFn(0);
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
  async getMVCommentFn(page) {
    const data = {
      id: this.props.match.params.mvid || '',
      limit: 15,
      offset: page
    };
    const res = await getMVComment(data);
    this.setState({
      comments: res.comments,
      hotComments: res.hotComments
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
  dataFormat(num) {
    const date = new Date(num);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  }
  getCommentList = (arr) => {
    if (!arr) return;
    const res = arr.map((item, index) => {
      return (
        <li key={index}>
          <a href="/">
            <img draggable="false" src={item.user.avatarUrl} alt="" />
          </a>
          <div className={styles['comment-right']}>
            <p>
              <a href="/">{item.user.nickname}</a>：{item.content}
            </p>
            {item.beReplied.length > 0 && (
              <p className={styles['beReplied']}>
                <span>
                  <i className={styles['bd']}>◆</i>
                  <i className={styles['bg']}>◆</i>
                </span>
                <a href="/">{item.beReplied[0].user.nickname}</a>：
                {item.beReplied[0].content}
              </p>
            )}
            <div className={styles['comment-right-foot']}>
              <span className={styles['foot-left']}>
                {this.dataFormat(item.time)}
              </span>
              <div className={styles['foot-right']}>
                <a
                  href="/"
                  style={{
                    marginRight: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <i className={styles['zan']}></i>
                </a>
                {item.likedCount > 0 && <span>({item.likedCount})</span>}
                <span className={styles['line']}>|</span>
                <a href="/" style={{ color: '#666666' }}>
                  回复
                </a>
              </div>
            </div>
          </div>
        </li>
      );
    });
    return res;
  };
  onChange = (page) => {
    console.log(page);
    this.getMVCommentFn((page - 1) * 15);
  };
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
              {this.state.hotComments && (
                <p className={styles['comment-sub-title']}>精彩评论</p>
              )}
              <ul className={styles['comment-hot']}>
                {this.getCommentList(this.state.hotComments)}
              </ul>
              {this.state.hotComments && (
                <p className={styles['comment-sub-title']}>最新评论</p>
              )}
              <ul className={styles['comment-hot']}>
                {this.getCommentList(this.state.comments)}
              </ul>
              <Pagination
                hideOnSinglePage
                showQuickJumper
                showSizeChanger={false}
                defaultCurrent={1}
                defaultPageSize={15}
                total={this.state.mvDetail.commentCount || 50}
                onChange={this.onChange}
              />
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
            <div className={styles['mv-right-wrap']}>
              <span className={styles['mv-right-title']}>
                网抑云音乐多端下载
              </span>
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
        </div>
      </div>
    );
  }
}
