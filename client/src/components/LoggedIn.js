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
    return (
      <div className="window Login-window">
        <div className="title-bar">
          <div className="title-bar-controls">
            <div className="title-bar-text">Logout-check</div>
          </div>
        </div>
        <div className="window-body">
          <fieldset id="login">
            <p className="title" style={{ left:"34%", top: "25%", position: "absolute" }}>로그아웃 하시겠습니까?</p>
            
            {
              
              <button id="checkBtn" onClick={this.props.logout.bind(this)}>확인</button>
              
            }

            <button id="selectBtn" 
              onClick={() => this.props.history.push('/selectStage')}
            >취소</button>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default withRouter(LoggedIn)