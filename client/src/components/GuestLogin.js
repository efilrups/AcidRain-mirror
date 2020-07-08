import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class GuestLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: ''
    }
  }
  componentDidMount(){
    document.querySelector('#inputGuest').focus()
  }
  inputGuest(event){
    this.setState({nickname: event.target.value})
  }
  enter = (async (event) => {
    if(event.key === 'Enter' || event.nativeEvent.type === 'click'){
      if(this.state.nickname === ''){
        alert('닉네임을 입력하세요')
        document.querySelector("#inputGuest").focus();
      } 
      // 입력창에 모두 올바르게 입력완료
      else {
        let result = await axios.post('http://:5000/main/guest', {
          nickname: this.state.nickname
        })
        console.log('result: ', result);

        if(result.data.result){
          alert(`환영합니다 ${this.state.nickname}님!!`)
          this.props.changeGuest(`Guest_${this.state.nickname}`)
          this.props.history.push('/selectStage')
        } else {
          this.setState({nickname: ''})
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
            <div className="title-bar-text">Guest Login</div>
            <button className="closeButton" aria-label="Close" onClick={()=>{this.props.history.push('/login')}}></button>
          </div>
        </div>
        <div className="window-body">
          <fieldset id="login">
            <p className="title" style={{ textAlign: "center", margin: "3rem"}}>로그인상태가 유지되지 않습니다</p>
            <input 
              id="inputGuest" type="text" 
              value={this.state.nickname}
              onChange={this.inputGuest.bind(this)} 
              onKeyDown={this.enter.bind(this)}
              placeholder="임시 닉네임을 입력하세요"
            />

            {/* <button id="userLogin" 
              // onClick={this.enter.bind(this)}
            >로그인</button> */}
            <button id="guestBtn" 
              onClick={this.enter.bind(this)}
            >게스트 로그인</button>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default withRouter(GuestLogin)
