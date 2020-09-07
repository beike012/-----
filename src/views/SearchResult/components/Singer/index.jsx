import React, { Component } from 'react';
import { Table } from 'antd';
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text,record) => <>
          <a href="/">{text}</a>
        <span>{record.alias}</span>
        <span>{record.mvid}</span>
          </>
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
      songCount: 0,
      hasMore: true,
      rowData: []
    };
  }
  formatDuring(mss) {
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    var seconds = (mss % (1000 * 60)) / 1000;
    seconds = parseInt(seconds);
    return minutes + ':' + seconds;
  }
  componentDidMount() {
    this.$axios
      .get('http://musicapi.leanapp.cn/search', {
        params: {
          keywords: this.props.keywords,
          type: '1'
        }
      })
      .then((res) => {
        if (res.data.code === 200 && res.data.result.songCount > 0) {
          const rowData = res.data.result.songs.map((item, index) => {
            return {
              name: item.name,
              artists: item.artists[0].name,
              album: item.album.name,
              time: this.formatDuring(item.duration),
              alias:item.alias[0],
              mvid:item.mvid,
              key: index
            };
          });
          this.setState({
            songCount: res.data.result.songCount,
            hasMore: res.data.result.hasMore,
            rowData
          });
          this.props.getCount(
            res.data.result.songCount,
            res.data.result.hasMore
          );
        }
      });
  }
  render() {
    return (
      <Table
        columns={this.state.columns}
        dataSource={this.state.rowData}
        showHeader={false}
      />
    );
  }
}
