import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios  from 'axios'
import Header from '../../components/Header'
import "./index.css"
export default class EditArticle extends Component {
  state={
    essayList:[]
  }
  //改变文章线上线下状态
  changeState=(articleId,state)=>{
    // console.log("changeState获取参数",articleId);
    axios.post(`https://qcpi7s.fn.thelarkcloud.com/onOrOffArticle`,{
      articleId:articleId
    }).then(
      response => {
        // console.log('changeState连接成功了',response.data.result);
      },
      error => {
        console.log("失败了",error.message);
      }
    )
    //更新state
    const { essayList } = this.state
    const newList = essayList.map((essayObj)=>{
      if(essayObj.articleId===articleId) return{...essayObj,state:state===1?0:1}
      else return essayObj
    })
    this.setState({essayList:newList})
  }
  //删除文章
  deleteEssay=(articleId)=>{
    if(window.confirm('确定删除吗')){
      // console.log("deleteEssay获取参数",articleId);
      axios.post(`https://qcpi7s.fn.thelarkcloud.com/deleteArticleById`,{
        articleId:articleId
      }).then(
        response => {
          // console.log('删除文章连接成功,数据为：',response.data.result);
        },
        error => {
          console.log("失败了",error.message);
        }
      )
      const { essayList } = this.state
      const newList = essayList.filter((essayObj)=>{
        return essayObj.articleId!==articleId
      })
      this.setState({essayList:newList})
    }
  }
  //新文章的articleId
  getNewId=()=>{
    const { essayList } = this.state
    var x=0
    for(var i=0;i<essayList.length;i++){
      if(i===essayList.length-1) {
        // console.log('i是',i,'id是',essayList[i].articleId);
        x=essayList[i].articleId+1;
        break;
      }
      if(parseInt(essayList[i].articleId)+1!==parseInt(essayList[i+1].articleId)){
        // console.log('i是',i,'id1是',essayList[i].articleId,'id2是',essayList[i+1].articleId);
        x=essayList[i].articleId+1;
        break;
      }
    }
    // console.log(x);
    this.setState({newArticleId:x})
  }
  componentDidMount(){
    axios.post(`https://qcpi7s.fn.thelarkcloud.com/getArticleList`).then(
      response => {
        // console.log("getdata",response.data.result);
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
    const { essayList,newArticleId } = this.state
    return (
        <div>
          <Header active2="active"/>
          <div className="editList">
            <h3>已有文章列表</h3>
            <table className="table-box">
              <thead>
                <tr>
                  <td>序号</td>
                  <td>标题</td>
                  <td>来源</td>
                  <td>日期</td>
                  <td>状态</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody>
                {
                  essayList.map((essayObj)=>{
                    return(
                      <tr key={essayObj._id}>
                        <td>{essayObj.articleId}</td>
                        <td>{essayObj.title}</td>
                        <td>{essayObj.source}</td>
                        <td>{essayObj.updatedAt}</td>
                        <td>{essayObj.state?'线上':'线下'}</td>
                        <td>
                          <Link className="edit-article" to={`/editExisted/${essayObj.articleId}`} target="_blank">编辑</Link>&nbsp;
                          <button className="state_button" onClick={()=>this.changeState(essayObj.articleId,essayObj.state)}>{essayObj.state?'下线':'上线'}</button>&nbsp;
                          <button className="state_button" onClick={()=>this.deleteEssay(essayObj.articleId)}>删除</button> 
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className="new-article">
              <Link className="new-article-link" onClick={this.getNewId} to={`/editEmpty/${newArticleId}`} target="_blank">文章录入</Link>
            </div>
          </div>
        </div>
      )
  }
}
