import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserLogin, GuestLogin, Signup } from '../components'
import { SelectStage } from './index'
import './css/Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    textChange(event){
      console.log(event.target.value)
      this.setState({text: event.target.value})
    }

    render() {
        const { userId, selectedStageName, handleStageButton , clickStage, getContents } = this.props;
        return (
            <div>
                <div className="window Login-window">
                  <div className="window-body">
                    <fieldset id="login">
                      <p className="title" style={{ textAlign: "center" }}>로그인</p>
                      

                      <input id="inputEmail" onChange={this.textChange.bind(this)} ></input>
                      <input id="inputPassword"></input>
                      <button id="userLogin">로그인</button>
                      <button id="guestLogin">게스트로그인</button>
                      <button id="signupBtn">회원가입</button>
                    </fieldset>
                  </div>
                </div>
                <UserLogin />
                <GuestLogin />
                <Signup />
                
                <Switch>
                  <Route 
                    path='/selectstage' 
                    render={
                      () => <SelectStage 
                      selectedStageName={selectedStageName} 
                      clickStage={clickStage}
                      handleStageButton={handleStageButton} 
                      getContents={getContents} 
                    />} 
                  />
                </Switch>
            </div>
        )
    }
}

export default Login
