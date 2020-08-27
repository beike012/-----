import React, { Component } from 'react';
import styles from './index.module.scss';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
        searchContent:''
    };
  }
  componentDidMount() {
    //   console.log(this.props.small);
  }
  handleClick = () => {
    if (!this.state.searchContent) return;
    console.log(this);
    this.props.history.push(`/SearchResult/${this.state.searchContent}`);
  };
  handleChange = (e) => {
    this.setState({
      searchContent: e.target.value.trim()
    });
  };
  //键盘事件
  inputKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  };
  render() {
    return (
      <div
        className={`${styles['input-wrap']} ${
          this.props.small && styles['small']
        }`}
      >
        <input
          type="text"
          onKeyUp={this.inputKeyUp}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>网抑一下</button>
      </div>
    );
  }
}
