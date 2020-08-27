import React, { Component } from 'react';
import styles from './index.module.scss';
import title from '../../assets/img/title.png';
import sad from '../../assets/img/sad.png';
import SearchBar from '../../components/SearchBar';
import { HashRouter as Router, Link } from 'react-router-dom';
import { Tabs, Table } from 'antd';
const { TabPane } = Tabs;
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songCount: 0,
      hasMore: true,
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>
        },
        {
          title: 'artists',
          dataIndex: 'artists',
          key: 'artists'
        },
        {
          title: 'album',
          dataIndex: 'album',
          key: 'album'
        },
        {
          title: 'time',
          dataIndex: 'time',
          key: 'time'
        }
      ],
      rowData: []
    };
  }
  componentDidMount() {
    // console.log('search',this.props.location.query.search);
    // console.log(this.props.match.params.search);
    this.$axios
      .get('http://musicapi.leanapp.cn/search', {
        params: {
          keywords: this.props.match.params.search
        }
      })
      .then((res) => {
        if (res.data.code === 200) {
          const rowData = res.data.result.songs.map((item, index) => {
            return {
              name: item.name,
              artists: item.artists[0].name,
              album: item.album.name,
              time: this.formatDuring(item.duration),
              key: index
            };
          });
          this.setState({
            songCount: res.data.result.songCount,
            hasMore: res.data.result.hasMore,
            rowData
          });
        }
      });
  }
  formatDuring(mss) {
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    if(minutes<10){minutes=`0${minutes}`}
    var seconds = (mss % (1000 * 60)) / 1000;
    seconds=parseInt(seconds)
    return minutes + ':' + seconds;
  }
  callback = (key) => {
    console.log('点我了哦', key);
  };
  render() {
    const StatisticsTip = () => {
      if (this.state.hasMore) {
        return `网抑云为您找到${this.state.songCount}+个相关结果`;
      } else {
        return `网抑云为您找到相关结果约${this.state.songCount}个`;
      }
    };
    return (
      <Router>
        <div className={styles['search-head-content']}>
          <div className={styles['top-left-menu']}>
            <a href="/">
              <img draggable="false" src={title} alt="" />
            </a>
            <SearchBar history={this.props.history} small></SearchBar>
          </div>
          <ul className={styles['top-right-menu']}>
            <li>
              <a href="/">网抑云首页</a>
            </li>
            <li>
              <Link
                className={styles['top-menu-item']}
                key={index}
                to={'/setUp'}
              >
                设置
              </Link>
            </li>
            <li className={styles['user-img']}>
              <img src={sad} alt="" />
            </li>
            <li>SadOnion</li>
          </ul>
        </div>
        <div className={styles['search-main-content']}>
          {/* {this.props.match.params.search} */}
          <span className={styles['statistics-tip']}>
            <StatisticsTip></StatisticsTip>
          </span>
          <div className={styles.tabbar}>
            <Tabs defaultActiveKey="单曲" onChange={this.callback}>
              <TabPane tab="单曲" key="单曲">
                <Table
                  columns={this.state.columns}
                  dataSource={this.state.rowData}
                  showHeader={false}
                />
              </TabPane>
              <TabPane tab="歌手" key="歌手">
                Content of Tab Pane 歌手
              </TabPane>
              <TabPane tab="专辑" key="专辑">
                Content of Tab Pane 专辑
              </TabPane>
              <TabPane tab="视频" key="视频">
                Content of Tab Pane 视频
              </TabPane>
              <TabPane tab="歌词" key="歌词">
                Content of Tab Pane 歌词
              </TabPane>
              <TabPane tab="歌单" key="歌单">
                Content of Tab Pane 歌单
              </TabPane>
              <TabPane tab="主播电台" key="主播电台">
                Content of Tab Pane 主播电台
              </TabPane>
              <TabPane tab="用户" key="用户">
                Content of Tab Pane 用户
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Router>
    );
  }
}
