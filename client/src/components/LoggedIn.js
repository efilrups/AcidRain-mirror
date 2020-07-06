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
  
  render() {
    console.log('this.props.userId: ', this.props.userId);
    return (
      <div className="window Login-window">
        <div className="title-bar">
          <div className="title-bar-controls">
            <div className="title-bar-text">Logged-in</div>
          </div>
        </div>
        <div className="window-body">
          <fieldset id="login">
            <p className="title" style={{ left:"35%", top: "25%", position: "absolute" }}>로그인 되었습니다</p>
            
            <button id="guestBtn" 
              onClick={this.props.logout.bind(this)}
            >로그아웃</button>
            <button id="selectBtn" 
              onClick={() => this.props.history.push('/selectStage')}
            >플레이</button>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default withRouter(LoggedIn)