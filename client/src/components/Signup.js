import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
const axios = require('axios');

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      nickname: ''
    }
  }
  componentDidMount(){
    document.querySelector('#inputEmail').focus()
  }
  inputEmail(event){
    this.setState({email: event.target.value})
  }
  inputPassword(event){
    this.setState({password: event.target.value})
  }
  inputNickname(event){
    this.setState({nickname: event.target.value})
  }
  verifyEmail = function() {
    // 이메일 검증 스크립트 작성
    var emailVal = this.state.email;
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 검증에 사용할 정규식 변수 regExp에 저장
    if (emailVal.match(regExp) != null) {
      return true
    } else {
      return false
    }
  }
  enter = (async (event) => {
    console.log(event.key)
    console.log('this.state.nickname.indexOf("Guest_"): ', this.state.nickname.indexOf("Guest_"));
    if(event.key === 'Enter' || event.nativeEvent.type === 'click'){
      if(this.state.email === ''){
        alert('이메일을 입력하세요')
        document.querySelector("#inputEmail").focus();
      } else if (!this.verifyEmail()){
        alert('올바른 이메일 형식이 아닙니다')
        document.querySelector("#inputEmail").focus();
      } else if (this.state.password === '') {
        alert('비밀번호를 입력하세요')
        document.querySelector("#inputPassword").focus();
      } else if (this.state.nickname === '') {
        alert('닉네임을 입력하세요')
        document.querySelector("#inputNickname").focus();
      } else if (this.state.nickname.indexOf("Guest_") === 0 || this.state.nickname.indexOf("guest_") === 0){
        alert('닉네임을 올바르게 입력하세요("Guest_"를 포함할 수 없습니다.)')
        document.querySelector("#inputNickname").focus();
      }
      // 입력창에 모두 올바르게 입력완료
      else {
        let result = await axios.post('http://localhost:5000/main/signup', {
          email : this.state.email,
          password: this.state.password,
          nickname: this.state.nickname
        })
        console.log('result: ', result);

        if(result.data.result){
          alert(`환영합니다 ${this.state.nickname}님!!`)
          this.props.history.push('/login')
        } else {
          alert(result.data.message)
        }
      }
    }
  })

  render() {
    return (
      <div className="window Login-window">
        <div className="title-bar">
          <div className="title-bar-controls">
            <div className="title-bar-text">Signup</div>
            <button className="closeButton" aria-label="Close" onClick={()=>{this.props.history.push('/login')}}></button>
          </div>
        </div>
        <div className="window-body">
          <fieldset id="login">
            <p className="title" style={{ textAlign: "center" }}></p>
            <input 
              id="inputEmail" type="text" 
              placeholder="이메일을 입력하세요"
              onChange={this.inputEmail.bind(this)} 
              onKeyDown={this.enter.bind(this)}
            />
            <input 
              id="inputPassword" type="password" 
              placeholder="비밀번호을 입력하세요"
              onChange={this.inputPassword.bind(this)} 
              onKeyDown={this.enter.bind(this)}
            />
            <input 
              id="inputNickname" type="text" 
              placeholder="닉네임을 입력하세요"
              onChange={this.inputNickname.bind(this)} 
              onKeyDown={this.enter.bind(this)}
            />

            <button 
              id="userSignup"
              onClick={this.enter.bind(this)}
            >회원가입</button>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default withRouter(Signup)

