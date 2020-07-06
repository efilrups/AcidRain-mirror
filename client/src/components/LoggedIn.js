import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class LoggedIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: ''
    }
  }
  componentDidMount(){
    document.querySelector('#inputGuest').focus()
  }
  

  render() {
    return (
      <div className="window Login-window">
        <div className="title-bar">
        <div className="title-bar-controls">
            <div className="title-bar-text">Logged-in</div>
            <button className="closeButton" aria-label="Close" onClick={()=>{this.props.history.push('/login')}}></button>
          </div>
        </div>
        <div className="window-body">
          <fieldset id="login">
            <p className="title" style={{ textAlign: "center" }}></p>
            <input 
              id="inputGuest" type="text" 
              // value={this.state.nickname}
              // onChange={this.inputGuest.bind(this)} 
              // onKeyDown={this.enter.bind(this)}
              placeholder="임시 닉네임을 입력하세요"
            />

            {/* <button id="userLogin" 
              // onClick={this.enter.bind(this)}
            >로그인</button> */}
            <button id="guestBtn" 
              // onClick={this.enter.bind(this)}
            >게스트 로그인</button>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default LoggedIn