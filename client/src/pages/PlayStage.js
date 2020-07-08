import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Play } from '../components'
import './css/PlayStage.css'
import "98.css"

class PlayStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
    }
    //이벤트 처리 함수들
    this.enterkey = this.enterkey.bind(this);
    this.startToggle = this.startToggle.bind(this);
  }
  componentDidMount() {
    document.querySelector('#playpage').focus()
    // if(this.inputStart) {
    //   this.inputStart.focus();
    // }
  }

  enterkey(event) {
    if (event.key === 'Enter') {
      console.log('--enter--');
      this.startToggle();
    }
  }

  startToggle() {
    this.props.gameStartToggle();
    this.setState(current => ({
      start: !current.start
    }));
  }

  onKey = (e) => {
    console.log(e.key)
    // if(e.key === 'Escape'){
    //   console.log('escape')
    //   this.props.history.push('/selectStage');
    // } else if (e.key === 'Enter'){
    //   this.gameStopRestartToggle()
    // }
  }


  render() {

    const gameRule = (
    <div className='gameRule'>
      <div className="playStage-description-box">
        <p className="playStage-description"> 산성비 게임에 오신 여러분, 환영합니다.</p>
        <p className="playStage-description">
            코딩을 시작하는 우리에게는 타이핑마저 어렵다!<br/>
          <br/>
          추억의 산성비 게임이 개발자를 위한 타이핑 연습 게임으로 재탄생했습니다.<br/>
          게임을 할수록 낯설었던 코드에 익숙해지는 여러분을 발견하실 수 있습니다.<br/>
          <br/>
          시작 버튼을 누르시거나, Enter를 누르면 게임이 시작됩니다.<br/>
          되돌아가기 버튼으로 스테이지를 다시 골라보세요<br/>
          그렇다면 이제부터 게임을 신나게 즐겨보세요.
        </p>
        <p className="playStage-description">-ph.GGANG팀 일동-</p>
      </div>

      <div className="field-row" style={{ justifyContent: 'center' }}>
        <button
          className="startButton"
          ref={(btn) => {this.inputStart = btn;}}
          onMouseUp={this.startToggle}
          onKeyUp={this.enterkey} >시작</button>
        <button onClick={this.props.history.goBack}>되돌아가기</button>
      </div>
    </div>
    )

    const { isLogin, userId, stageContents, selectedStageName,
       color, gameLevel, gameStart, gameStartToggle } = this.props

    return (
      <div 
        id="playpage"
        className="playStage-square"  
        onKeyDown={this.onKey}
      >

        {

          //1. 로그인 했고 스테이지 선택 안한 상태, 게임 시작 안한 상태면 빈 화면 (메인화면)
          //2. 스테이지 선택했고, 게임이 아직 시작 안한 상태? 게임 설명화면
          //3. 게임이 시작--> 게임화면

          (!stageContents && !this.state.start)  ? ''//this.props.history.goBack()
          : (stageContents &&  !this.state.start) ? gameRule
         : <Play
           userId={userId} selectedStageName={selectedStageName} gameStart={gameStart}
           stageContents={stageContents} gameStartToggle={gameStartToggle} color={color}  gameLevel={gameLevel}/>
        }


      </div>
    )
  }
}

export default withRouter(PlayStage)
