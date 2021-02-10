import React, { Component } from 'react'
import axios from 'axios'
import "./index.css"
export default class Edit extends Component {
  state={ //初始化数据
    title:'',
    // articleId:'',
    source:'',
    content:'',
    state1:0
  }
  //#region 更新数据
  getTitle=(event)=>{
    // console.log(event.target.value);
    this.setState({title:event.target.value})
  }
  getSource=(event)=>{
    this.setState({source:event.target.value})
  }
  getContent=(event)=>{
    // console.log(event.target.value);
    this.setState({content:event.target.value})
  }
  //#endregion
  //提交文章
  submitEssay=()=>{
    const { title,articleId,source,content,state1 } = this.state
    console.log("提交了",this.state);
    axios.post(`https://qcpi7s.fn.thelarkcloud.com/saveArticle`,{
      title:title,
      articleId:articleId,
      source:source,
      content:content,
      state:state1,
      likeCount:0,
      dislikeCount:0
    }).then(
      response => {
        // console.log("成功了",response.data.result);
        window.alert("提交成功")
      },
      error => {console.log("失败了",error.message);}
    )
  }
  componentDidMount(){
    const { articleId,newArticleId } = this.props
    console.log(articleId);
    if(articleId){//如果传值 则调用文章数据
      //#region 网络请求数据
      axios.post(`https://qcpi7s.fn.thelarkcloud.com/getArticleById`,{
        articleId:articleId
      }).then(
        response => {
          // console.log('Edit连接成功');
          if(response.data.result){
            // console.log('Edit收到数据',response.data.result);
            const {title,articleId,source,content,state} = response.data.result||{};
            this.setState({title,articleId,source,content,state1:state})
          }
          // else console.log('获取数据失败 ',response.data.result);
        },
        error => {
          console.log("失败了",error.message);
        }
      )
      //#endregion
    }
    else{
      console.log("newArticleId:",newArticleId);
      this.setState({articleId:newArticleId})
    }
    
  }
  render() {
    const { title,source,content } = this.state
    return (
      <div>
        <div className="edit_div">
          <label htmlFor="txt">标题</label>&nbsp;
          <input onChange={this.getTitle} type="text" defaultValue={title}/>
        </div>
        <div className="edit_div">
          <label htmlFor="txt">来源</label>&nbsp;
          <input onChange={this.getSource} type="text" defaultValue={source}/>
        </div>
        <div className="edit_div">
          <label htmlFor="txt">内容</label>&nbsp;
          <textarea onChange={this.getContent} type="text" defaultValue={content}/>
        </div>
        <button className="submit_box" onClick={this.submitEssay}>提交</button>
      </div>
    )
  }
}
