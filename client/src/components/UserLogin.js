import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class UserLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      userId: '오마이갇'
    }
  }

  componentDidMount(){
    document.querySelector("#inputEmail").focus();
  }

    inputEmail(event){
      this.setState({email: event.target.value})
    }
    inputPassword(event){
      this.setState({password: event.target.value})
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
    enter = async (event) => {
      console.log('event: ', event.nativeEvent.type);

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
        } else {
          try{
            let result = await axios.post('http://localhost:5000/main/login', {
              email : this.state.email,
              password: this.state.password,
            })
            console.log('result: ', result);
            
            this.props.changeUserId(result.data.nickname)
            alert('Welcome!!')
            this.props.history.push('/selectStage')
            this.setState({email: '', password: ''})

          } catch(err) {
            console.log(err)
            alert('회원정보가 존재하지 않습니다 회원가입을 진행해주세요')
            this.setState({email: '', password: ''})
          }
        }
      }
    }
    render() {
      return (
        <div className="window Login-window">
          <div className="title-bar">
            <div className="title-bar-text">login</div>
          </div>
          <div className="window-body">
            <fieldset id="login">
              <p className="title" style={{ textAlign: "center" }}></p>
              <input 
                id="inputEmail" type="text" 
                value={this.state.email}
                onChange={this.inputEmail.bind(this)} 
                onKeyDown={this.enter.bind(this)}
                placeholder="이메일을 입력하세요"
              />
              <input 
                id="inputPassword" type="password" 
                value={this.state.password}
                onChange={this.inputPassword.bind(this)} 
                onKeyDown={this.enter.bind(this)}
                placeholder="비밀번호를 입력하세요"
              />

              <button id="userLogin" onClick={this.enter.bind(this)}>로그인</button>
              <button id="guestLogin" onClick={this.props.changeGuest}>게스트로그인</button>
              <button id="signupBtn" 
                onClick={() => this.props.history.push('/signup')}
              >회원가입</button>
              <button id="socialLogin">소셜 로그인</button>
            </fieldset>
          </div>
        </div>
      )
    }
}

export default withRouter(UserLogin)
