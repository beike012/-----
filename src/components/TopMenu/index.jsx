import React, { Component } from 'react';
import title from '@/assets/img/title.png';
import sad from '@/assets/img/sad.png';
import styles from './index.module.scss';
import SearchBar from '@/components/SearchBar';
import { Link } from 'react-router-dom';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles['search-head-content']}>
        <div className={styles['top-left-menu']}>
          <a href="/">
            <img draggable="false" src={title} alt="" />
          </a>
          <SearchBar
            defaultValue={this.props.defaultValue}
            history={this.props.history}
            small
          ></SearchBar>
        </div>
        <ul className={styles['top-right-menu']}>
          <li>
            <a href="/">网抑云首页</a>
          </li>
          <li>
            <Link className={styles['top-menu-item']} key={index} to={'/setUp'}>
              设置
            </Link>
          </li>
          <li className={styles['user-img']}>
            <img src={sad} alt="" />
          </li>
          <li>SadOnion</li>
        </ul>
      </div>
    );
  }
}
