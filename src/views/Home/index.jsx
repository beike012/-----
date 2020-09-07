import React, { Component } from 'react';
import styles from './index.module.scss';
import {
  HashRouter as Router,
  Link
} from 'react-router-dom';
import rain from '../../assets/img/rain.png';
import sad from '../../assets/img/sad.png';
import title from '../../assets/img/title.png';
import SearchBar from '../../components/SearchBar'

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topMenuList: [
        {
          name: '焦虑',
          url: '/JiaoLv'
        },
        {
          name: '压抑',
          url: '/YaYi'
        },
        {
          name: '暴躁',
          url: '/BaoZao'
        },
        {
          name: '忧郁',
          url: '/YouYu'
        },
        {
          name: '更多',
          url: '/More'
        }
      ]
    };
  }
  render() {
    return (
      <Router>
        <div className={styles['home-head-content']}>
          <ul className={styles['top-menu']}>
            {this.state.topMenuList.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className={styles['top-menu-item']}
                   
                    to={item.url}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className={styles['top-right-menu']}>
            <li className={styles['top-right-menu-item']}>
              深圳 12℃
              <img src={rain} alt=""/>
              <span className={styles.quality}>劣</span>
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
            <li className={styles['user-img']}><img src={sad} alt=""/></li>
            <li>SadOnion</li>
          </ul>
        </div>
        <div className={styles['home-main-content-wrap']}>
        <div className={styles['home-main-content']}>
          <a href="/"><img  draggable="false" src={title} alt=""/></a>
          <SearchBar history={this.props.history}></SearchBar>
        </div>
        </div>
        <div className={styles['home-foot-content']}>
        <ul className={styles['list-left']}>
            <li><a href="/">设为首页</a></li>
            <li><a href="/">关于网抑</a></li>
            <li><a href="/">About Wangyi</a></li>
            <li><a href="/">网抑营销</a></li>
            <li><a href="/">使用网抑前必读</a></li>
            <li><a href="/">意见反馈</a></li>
            <li><a href="/">帮助中心</a></li>
        </ul>
        <ul className={styles['list-right']}>
            <li><a href="/">©2020 Wangyi</a></li>
            <li><a href="/">(京)-经营性-2017-0020</a></li>
            <li><a href="/">京公网安备11000002000001号</a></li>
            <li><a href="/">京ICP证030173号</a></li>
        </ul>

        </div>
      </Router>
    );
  }
}