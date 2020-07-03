import React, { Component } from 'react'
import { Play } from '../components'
import './css/PlayStage.css'
import "98.css"

class PlayStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStart : false,
      // gameOver : false,
    }
    //이벤트 처리 함수들
    this.enterkey = this.enterkey.bind(this);
    this.gameStartToggle = this.gameStartToggle.bind(this);
    // this.gameOverToggle = this.gameOverToggle.bind(this);
  }
  componentDidMount() {
    this.inputStart.focus();
  }

  enterkey(event) {
    if (event.key === 'Enter') {
      console.log('hi');
      this.gameStartToggle();
      console.log('---')
    }
  }
  gameStartToggle () {
    console.log('Game Start');
    this.setState(current =>({
      gameStart: !current.gameStart
    }));
  }
  // gameOverToggle () {
  //   console.log('Game Over');
  //
  //   this.setState(current=>({
  //     gameStart: !current.gameStart,
  //     gameOver: !current.gameOver
  //   }));
  // }

  render() {
    const gameRule = (
      <div className='window-body gameRule'>
        <p className="title" style={{ textAlign: "center" }}>게임 설명</p>
        <fieldset>
          <p style={{ textAlign: "center" }}>산성비 - ph.GGANG</p>
          <p style={{ textAlign: "center" }}>시작 버튼을 누르시거나, Enter를 누르면 게임이 시작됩니다.</p>
          <p style={{ textAlign: "center" }}>되돌아가기 버튼으로 스테이지를 다시 골라보세요[아직]</p>

          <div className="field-row" style={{ justifyContent: 'center' }}>
            <button
              ref={ref=>this.inputStart=ref}
              onMouseUp={this.gameStartToggle}
              onKeyUp={this.enterkey} >시작</button>


              <button>되돌아가기</button>
          </div>
        </fieldset>
      </div>
    )

    const { userId, selectedStageName, stageContents } = this.props

    return (
      <div className="window PlayStage-window">

        {
          this.state.gameStart
            ? <Play gameStartToggle={this.gameStartToggle} enterkey={this.enterkey} userId={userId}
            selectedStageName={selectedStageName} stageContents={stageContents} />
            : gameRule
        }

        {/* <GameOver/> */}

      </div>
    )
  }
}

export default PlayStage
