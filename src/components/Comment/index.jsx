import React, { Component } from 'react';
import { Pagination } from 'antd';
import { getMVComment } from '@/api/mv';
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
        mvDetail: {},
        comments: [],
      hotComments: [],
    };
  }
  componentDidMount() {
    this.getMvDetailFn();
    this.getMVCommentFn(0);
  }
  async getMvDetailFn() {
    const res = await getMvDetail(this.props.match.params.mvid || '');
    this.setState({
      mvDetail: res.data
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
  onChange = (page) => {
    console.log(page);
    this.getMVCommentFn((page - 1) * 15);
  };
  render() {
    return (
      <div className={styles['comment-wrap']}>
        <div className={styles['comment-title']}>
          <h2>评论</h2>
          {/* <span>共{this.state.mvDetail.commentCount}条评论</span> */}
          <span>共233条评论</span>
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
    );
  }
}
