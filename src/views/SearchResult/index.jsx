import React, { Component } from 'react';
import styles from './index.module.scss';
import TopMenu from '@/components/TopMenu';
import SingleSong from './components/SingleSong';
import Singer from './components/Singer';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songCount: 0,
      hasMore: true
    };
  }
  componentDidMount() {
    // console.log('search',this.props.location.query.search);
    // console.log(this.props.match.params.search);
  }

  callback = (key) => {
    console.log('点我了哦', key);
  };
  getCount=(songCount,hasMore)=>{
    this.setState({
      songCount,hasMore
    })
  }
  render() {
    const StatisticsTip = () => {
      if (this.state.hasMore) {
        return `网抑云为您找到${this.state.songCount}+个相关结果`;
      } else {
        return `网抑云为您找到相关结果约${this.state.songCount}个`;
      }
    };
    return (
      <div>
        <TopMenu defaultValue={this.props.match.params.search} history={this.props.history}></TopMenu>
        <div className={styles['search-main-content']}>
          {/* {this.props.match.params.search} */}
          <span className={styles['statistics-tip']}>
            <StatisticsTip></StatisticsTip>
          </span>
          <div className={styles.tabbar}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="单曲" key="1">
                <SingleSong getCount={this.getCount} keywords={this.props.match.params.search} history={this.props.history}></SingleSong>
              </TabPane>
              <TabPane tab="歌手" key="100">
                <Singer></Singer>
              </TabPane>
              <TabPane tab="专辑" key="10">
                Content of Tab Pane 专辑
              </TabPane>
              <TabPane tab="视频" key="1014">
                Content of Tab Pane 视频
              </TabPane>
              <TabPane tab="歌词" key="1006">
                Content of Tab Pane 歌词
              </TabPane>
              <TabPane tab="歌单" key="1000">
                Content of Tab Pane 歌单
              </TabPane>
              <TabPane tab="主播电台" key="1009">
                Content of Tab Pane 主播电台
              </TabPane>
              <TabPane tab="用户" key="1002">
                Content of Tab Pane 用户
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
