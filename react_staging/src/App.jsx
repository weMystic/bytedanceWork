import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import ArticleOnlineList from './pages/ArticleOnlineList'
import Article from './pages/ArticleOnlineList/Article-Item/Article'
import EditArticle from './pages/EditArticle'
import EditExisted from './pages/EditArticle/EditExisted'
import EditEmpty from './pages/EditArticle/EditEmpty'
export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/articleOnlineList" component={ArticleOnlineList}/>
          <Route path="/editArticle" component={EditArticle}/>
          <Route path="/editExisted/:articleId" component={EditExisted}/>
          <Route path="/article/:articleId" component={Article}/>
          <Route path="/editEmpty/:newArticleId" component={EditEmpty}/>
          <Redirect to="/articleOnlineList"/>
        </Switch>
      </div>
    )
  }
}
