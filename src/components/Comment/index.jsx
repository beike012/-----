import React, { Component } from 'react';
import { Pagination } from 'antd';
import { getMvDetail, getMVComment } from '@/api/mv';
import { getVideoComment } from '@/api/video';
import styles from './index.module.scss';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mvDetail: {},
      comments: [],
      hotComments: []
    };
  }
  componentDidMount() {
    if(this.props.mvid){
      this.getMvDetailFn();
      this.getMVCommentFn(0);
    }else if(this.props.id){
      this.getVideoCommentFn(0)
    }
  }
  async getMvDetailFn() {
    const res = await getMvDetail(this.props.mvid || '');
    this.setState({
      mvDetail: res.data
    });
  }
  async getMVCommentFn(page) {
    const data = {
      id: this.props.mvid || '',
      limit: 15,
      offset: page
    };
    const res = await getMVComment(data);
    this.setState({
      comments: res.comments,
      hotComments: res.hotComments
    });
  }
  async getVideoCommentFn(page) {
    const data = {
      id: this.props.id || '',
      limit: 15,
      offset: page
    };
    const res = await getVideoComment(data);
    this.setState({
      comments: res.comments,
      hotComments: res.hotComments
    });
  }
  onChange = (page) => {
    // console.log(page);
    if(this.props.mvid){
      this.getMVCommentFn((page - 1) * 15);
    }else if(this.props.id){
      this.getVideoCommentFn((page - 1) * 15);
    }
  };
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
  render() {
    return (
      <div className={styles['comment-wrap']}>
        <div className={styles['comment-title']}>
          <h2>评论</h2>
          <span>共{this.props.commentCount}条评论</span>
          {/* <span>共233条评论</span> */}
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
          total={this.props.commentCount || 50}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
