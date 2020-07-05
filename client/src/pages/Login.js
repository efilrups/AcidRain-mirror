import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserLogin, GuestLogin, Signup } from '../components'
import { SelectStage } from './index'
import './css/Login.css'
const axios = require('axios');

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          password: '',
          userId: '오마이갇'
        }
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
    };
    async enter(event){
      if(event.key === 'Enter'){
        
        if(this.state.email === ''){
          alert('이메일을 입력하세요')
        } else if (!this.verifyEmail()){
          alert('올바른 이메일 형식이 아닙니다')
        } else if (this.state.password === '') {
          alert('비밀번호를 입력하세요')
        } else {
          
          let result = await axios.post('http://localhost:5000/main/login', {
            email : this.state.email,
            password: this.state.password,
          })
          console.log(result)
          
          this.props.changeUserId(this.state.userId)

          this.setState({email: '', password: ''})
        }
      }
    }

    render() {
        const { userId, selectedStageName, handleStageButton , clickStage, getContents, stageContents } = this.props;
        return (
            <div>
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
                      />
                      <input 
                        id="inputPassword" type="password" 
                        value={this.state.password}
                        onChange={this.inputPassword.bind(this)} 
                        onKeyDown={this.enter.bind(this)}
                        name="password"
                      />

                      <button id="userLogin">로그인</button>
                      <button id="guestLogin" onClick={this.props.changeGuest.bind()}>게스트로그인</button>
                      <button id="signupBtn">회원가입</button>
                      <button id="socialLogin">소셜 로그인</button>
                    </fieldset>
                  </div>
                </div>
                <UserLogin />
                <GuestLogin />
                <Signup />

              
                
                <Route path='/selectstage' render={() => <SelectStage selectedStageName={selectedStageName} clickStage={clickStage}
                   handleStageButton ={handleStageButton} getContents={getContents} stageContents={stageContents} />} />

            </div>
        )
    }
}

export default Login
