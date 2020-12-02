import React, { Component } from 'react';
import {
  getVideoUrl,
  getVideoDetail,
  getVideoDetailInfo,
  getRelatedVideo
} from '@/api/video';
import TopMenu from '@/components/TopMenu';
import Comment from '@/components/Comment';
import SideDownload from '@/components/SideDownload';
import MvBtnGroup from '@/components/MvBtnGroup';
import MVRecommend from '@/components/MVRecommend';
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
    this.getVideoUrlFn();
    this.getVideoDetailFn();
    this.getVideoDetailInfoFn();
    this.getRelatedVideoFn();
  }
  async getVideoUrlFn() {
    const res = await getVideoUrl(this.props.match.params.id || '');
    if (!res.urls.length) return;
    this.setState({
      videoSrc: res.urls[0].url
    });
  }
  async getVideoDetailFn() {
    const res = await getVideoDetail(this.props.match.params.id || '');
    this.setState({
      mvDetail: res.data
    });
  }
  async getVideoDetailInfoFn() {
    const res = await getVideoDetailInfo(this.props.match.params.id || '');
    this.setState({
      mvDetailInfo: res
    });
  }
  async getRelatedVideoFn() {
    const res = await getRelatedVideo(this.props.match.params.id || '');
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
  getDate(num) {
    const theDate = new Date(num);
    const y = theDate.getFullYear();
    const M = theDate.getMonth() + 1;
    const d = theDate.getDate();
    return y + '-' + M + '-' + d;
  }
  render() {
    return (
      <div className={styles['mv-outer-wrap']}>
        <TopMenu history={this.props.history}></TopMenu>
        <div className={styles['mv-main-content']}>
          <div className={styles['mv-left-content']}>
            <div className={styles['mv-title']}>
              {/* <i></i> */}
              <div className={styles['mv-title-div']}>
                <h2>{this.state.mvDetail.title}</h2>
                by{' '}
                <a className={styles['mv-title-a']} href="/">
                  {this.state.mvDetail.creator &&
                    this.state.mvDetail.creator.nickname}
                </a>
              </div>
            </div>
            <video autoPlay controls src={this.state.videoSrc}></video>
            <MvBtnGroup
              likedCount={this.state.mvDetailInfo.likedCount}
              subCount={this.state.mvDetail.subscribeCount}
              shareCount={this.state.mvDetail.shareCount}
            ></MvBtnGroup>
            <Comment
              commentCount={this.state.mvDetail.commentCount}
              id={this.props.match.params.id}
            ></Comment>
          </div>
          <div className={styles['mv-right-content']}>
            <div className={styles['mv-right-wrap']}>
              <span className={styles['mv-right-title']}>MV简介</span>
              <p>发布时间：{this.getDate(this.state.mvDetail.publishTime)}</p>
              <p>
                播放次数：{this.getPlayCount(this.state.mvDetail.playTime)}次
              </p>
              <p className={styles['mv-right-description']}>
                {this.state.mvDetail.description}
              </p>
            </div>
            <MVRecommend
              history={this.props.history}
              relatedVideo={this.state.relatedVideo}
            ></MVRecommend>
            <SideDownload></SideDownload>
          </div>
        </div>
      </div>
    );
  }
}
