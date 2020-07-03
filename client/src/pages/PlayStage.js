import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { GameOver, Play } from '../components'

class PlayStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStart : false,
      gameOver : false,
    }
    //이벤트 처리 함수들
    this.enterkey = this.enterkey.bind(this);
    this.gameStartToggle = this.gameStartToggle.bind(this);
    this.gameOverToggle = this.gameOverToggle.bind(this);
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
    this.setState({
      gameStart: !this.state.gameStart
    });
  }
  gameOverToggle () {
    console.log('Game Over');

    this.setState({
      gameStart: !this.state.gameStart,
      gameOver: !this.state.gameOver
    });

  }

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

    return (
      <div className="window playStage">

        {
          this.state.gameStart
          ? <Play gameOverToggle={this.gameOverToggle} enterkey={this.enterkey}/>
          : gameRule
        }
        {
          this.state.gameOver
          ? <GameOver/>
          : ''
        }
      </div>
    )
  }
}

export default PlayStage
