import React, { Component } from 'react'
import axios from 'axios'
import Item from './Article-Item'
import Header from '../../components/Header'
import "./index.css"
export default class ArticleOnlineList extends Component {
  state = {
    essayList: [],
  }
  componentDidMount(){
    // console.log('componentDidMount');
    axios.post(`https://qcpi7s.fn.thelarkcloud.com/getArticleList`).then(
      response => {
        // console.log(response.data.result);
        var tempList = response.data.result
        tempList.sort((a,b)=>{
          return a.articleId-b.articleId
        })
        this.setState({essayList:tempList})
      },
      error => {
        console.log("失败了",error.message);
      }
    )
  }
  render() {
    const {essayList}= this.state
    const onlineEssayList = essayList.filter((essayObj)=>{
      return essayObj.state===1;
    })
    return (
      <div>
        <Header active1="active"/>
        <div className = "list">
          {
            onlineEssayList.map((essayObj)=>{
              return (<Item key={essayObj.articleId} {...essayObj}/>)
            })
          }
        </div>
      </div>
    )
  }
}
