import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';

import Home from './views/Home'
import Login from './views/Login'
import BaoZao from './views/BaoZao';
import JiaoLv from './views/JiaoLv';
import More from './views/SetUp';
import YaYi from './views/YaYi';
import YouYu from './views/YouYu';
import SearchResult from './views/SearchResult';
import MV from './views/MV';
import Video from './views/Video';
function App() {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/BaoZao" component={BaoZao}></Route>
          <Route path="/JiaoLv" component={JiaoLv}></Route>
          <Route path="/More" component={More}></Route>
          <Route path="/YaYi" component={YaYi}></Route>
          <Route path="/YouYu" component={YouYu}></Route>
          <Route path="/SearchResult/:search" component={SearchResult}></Route>
          <Route path="/MV/:mvid" component={MV}></Route>
          <Route path="/Video/:id" component={Video}></Route>
          <Redirect exact from="/" to="/home"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
