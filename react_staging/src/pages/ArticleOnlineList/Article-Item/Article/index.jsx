import React, { Component } from "react";
import axios from 'axios'
import "./index.css";
export default class Article extends Component {
  state = {
    title: "",
    source: "",
    updatedAt: "",
    content:"",
    favor: 0,
    isFavor: false,
    dislike: 0,
    isDislike: false,
  };
  //更新点赞数
  updateFavor = () => {
    // console.log('updateFavor');
    const { articleId,favor, isFavor,dislike,isDislike } = this.state;
    console.log(articleId);
    //#region 点击后，当前bool值取反
    if(!isFavor){
      //即点赞
      axios.post(`https://qcpi7s.fn.thelarkcloud.com/increLikeCount`,{
        articleId:articleId
      }).then(
        response => {
          // console.log('点赞',response.data.result);
        },
        error => {
          console.log("失败了",error.message);
        }
      )
    }else {
      //即取消点赞
      axios.post(`https://qcpi7s.fn.thelarkcloud.com/decrLikeCount`,{
        articleId:articleId
      }).then(
        response => {
          // console.log('取消点赞',response.data.result);
        },
        error => {
          console.log("失败了",error.message);
        }
      )
    }
    if(!isFavor&&isDislike){
      //点踩后点赞，则要取消点踩，并点赞 点赞操作已完成，此处取消点踩即可
      axios.post(`https://qcpi7s.fn.thelarkcloud.com/decrDislikeCount`,{
        articleId:articleId
      }).then(
        response => {
          // console.log('点赞后取消点踩',response.data.result);
        },
        error => {
          console.log("失败了",error.message);
        }
      )
    }
    //#endregion
    this.setState({
      favor: !isFavor ? favor + 1 : favor - 1,
      isFavor: !isFavor,
      dislike:!isFavor&&isDislike?dislike-1:dislike,
      isDislike:!isFavor&&isDislike?!isDislike:isDislike
    });
    // console.log(this);
  };
  //更新踩
  updateDislike=()=>{
    const { articleId,dislike, isDislike,favor, isFavor } = this.state;
    //#region 点击后，当前bool值取反
    if(!isDislike){
      //即点踩
      axios.post(`https://qcpi7s.fn.thelarkcloud.com/increDislikeCount`,{
        articleId:articleId
      }).then(
        response => {
          // console.log('点踩',response.data.result);
        },
        error => {
          console.log("失败了",error.message);
        }
      )
    }else {
      //即取消点踩
      axios.post(`https://qcpi7s.fn.thelarkcloud.com/decrDislikeCount`,{
        articleId:articleId
      }).then(
        response => {
          // console.log('取消点踩',response.data.result);
        },
        error => {
          console.log("失败了",error.message);
        }
      )
    }
    if(isFavor&&!isDislike){
      //点赞后点踩，则要取消点赞，并点踩 点踩操作已完成，此处取消点赞即可
      axios.post(`https://qcpi7s.fn.thelarkcloud.com/decrLikeCount`,{
        articleId:articleId
      }).then(
        response => {
          // console.log('点踩后取消点赞',response.data.result);
        },
        error => {
          console.log("失败了",error.message);
        }
      )
    }
    //#endregion
    this.setState({
      dislike: !isDislike ? dislike + 1 : dislike - 1,
      isDislike: !isDislike,
      favor:!isDislike&&isFavor?favor-1:favor,
      isFavor:!isDislike&&isFavor?!isFavor:isFavor
    });
    // console.log(this);
  }
  componentDidMount(){
    console.log(this.props.match.params.articleId);
    axios.post(`https://qcpi7s.fn.thelarkcloud.com/getArticleById`,{
      articleId:this.props.match.params.articleId
    }).then(
      response => {
        // console.log('连接成功',response.data.result);
        if(response.data.result){
          // console.log("获取到数据");
          const {articleId,title,source,updatedAt,content,likeCount,dislikeCount} = response.data.result||{}
          this.setState({articleId,title,source,updatedAt,content,favor:likeCount,dislike:dislikeCount})
        }else{//没有数据也能进行其他操作
          this.setState({articleId:this.props.match.params.articleId})
        }
      },
      error => {
        console.log("失败了",error.message);
      }
    )
  }
  
  render() {
    // console.log('article render');
    const { title, source, updatedAt, content, favor, dislike, isFavor,isDislike } = this.state;
    return (
      <div className="article-content">
        <h1>{title}</h1>
        <div className="article-meta">
          {source}&nbsp;&nbsp;{updatedAt}
        </div>
        <div className="content-box">{content}</div>
        <div className="favor-dislike">
          <button className="btn" onClick={this.updateFavor} style={{backgroundColor:isFavor?'lightblue':'#ccc'}}>赞  {favor}</button>
          <button className="btn" onClick={this.updateDislike} style={{backgroundColor:isDislike?'lightblue':'#ccc'}}>踩  {dislike}</button>
        </div>
      </div>
    );
  }
}
