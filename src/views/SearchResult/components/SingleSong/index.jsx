import React, { Component } from 'react';
import { Table, Modal } from 'antd';
import styles from './index.module.scss';
import { getSongUrl, search } from '@/api/search';
import store from '@/store';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text, record, index) => (
            <div className={styles['name-col']}>
              <i
                onClick={() => this.handlePlayIconClick(index, record.id)}
                className={`play-icon${
                  index === this.state.activeIndex ? ' active' : ''
                }`}
                title="播放"
              ></i>
              <a className={styles['main-text']} title={text} href="/">
                {this.keywordsDetect(text)}
              </a>
              <span className={styles.alias}>
                {record.alias ? `-(${record.alias})` : ''}
              </span>
              <i
                onClick={() => this.handleMvIconClick(record.mvid)}
                className={record.mvid > 0 ? styles.mv : ''}
                title="MV"
              ></i>
            </div>
          )
        },
        {
          title: 'artists',
          dataIndex: 'artists',
          key: 'artists',
          render: (text) => <a href="/" title={text}>{this.keywordsDetect(text)}</a>
        },
        {
          title: 'album',
          dataIndex: 'album',
          key: 'album',
          render: (text) => <a href="/" title={text}>《{this.keywordsDetect(text)}》</a>
        },
        {
          title: 'time',
          dataIndex: 'time',
          key: 'time'
        }
      ],
      songCount: 0,
      hasMore: true,
      rowData: [],
      activeIndex: '',
      audioSrc: ''
    };
  }
  handlePlayIconClick = (index, id) => {
    console.log(this, index, id);
    this.setState({
      activeIndex: index
    });
    this.getUrl(id);
  };
  handleMvIconClick = (id) => {
    this.props.history.push(`/MV/${id}`);
  };
  async getUrl(id) {
    const res = await getSongUrl(id);
    console.log(res);
    if (res.code === 200 && res.data[0]) {
      if (res.data[0].url) {
        this.setState({
          audioSrc: res.data[0].url
        });
        const audio = document.getElementById('my-audio');
        audio.play();
      } else {
        Modal.confirm({
          title: '开通会员',
          content: '该资源为VIP专享，开通VIP畅听无阻',
          okText: '去开通',
          cancelText: '取消'
        });
      }
    }
  }
  formatDuring(mss) {
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    seconds = parseInt(seconds);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return minutes + ':' + seconds;
  }
  keywordsDetect(val) {
    const keywords = this.props.keywords;
    const bool = new RegExp(keywords, 'i').test(val);
    if (bool) {
      const arr = val.split(keywords);
      // console.log('arr,val,keywords');
      // console.log(arr,val,keywords);
      //大小写问题,不同的时候会只返回一位数组
      if (arr.length === 2) {
        return (
          <>
            {arr[0]}
            <span className="blue">{keywords}</span>
            {arr[1]}
          </>
        );
      } else {
        return <span className="blue">{val}</span>;
      }
    } else {
      return val;
    }
  }
  async componentDidMount() {
    const res = await search({
      keywords: this.props.keywords,
      type: '1'
    });
    if (res.code === 200 && res.result.songCount > 0) {
      const rowData = res.result.songs.map((item, index) => {
        return {
          name: item.name,
          artists: item.artists[0].name,
          album: item.album.name,
          time: this.formatDuring(item.duration),
          alias: item.alias[0],
          mvid: item.mvid,
          id: item.id,
          key: index
        };
      });
      this.setState({
        songCount: res.result.songCount,
        hasMore: res.result.hasMore,
        rowData
      });
      this.props.getCount(res.result.songCount, res.result.hasMore);
    }
    const initialGoodsList = store.getState();
    console.log('initialGoodsList', initialGoodsList, this.props);
  }
  render() {
    return (
      <>
        <Table
          columns={this.state.columns}
          dataSource={this.state.rowData}
          showHeader={false}
        />
        <audio
          id="my-audio"
          controls
          src={this.state.audioSrc}
          style={{ width: '800px', border: '0' }}
        ></audio>
      </>
    );
  }
}
