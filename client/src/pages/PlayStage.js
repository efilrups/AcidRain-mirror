import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { GameOver, Play } from '../components'

class PlayStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying : false,
    }
    //이벤트 처리 함수들
    this.enterkey = this.enterkey.bind(this);
    this.isPlayingToggle = this.isPlayingToggle.bind(this);

  }

  enterkey(event) {
    if (event.key === 'Enter') {
      console.log('hi');
      this.isPlayingToggle();
      console.log('---')
    }
  }
  isPlayingToggle () {
    console.log('hiiiiii');
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  render() {
    const gameRule = (
      <div className='gameRule'>
        <pre>
        {`
산성비 - ph.GGANG
시작 버튼을 누르거나
Enter를 누르면 게임이 시작됩니다.
[게임 설명]
        `}
        </pre>
        <input
          type='button'
          value='시작'
          onMouseUp={this.isPlayingToggle}
          onKeyUp={this.enterkey} />
      </div>
    )

    return (
      <div className="playStage">

        {
          this.state.isPlaying
          ? <Play isPlayingToggle={this.isPlayingToggle} enterkey={this.enterkey}/>
          : gameRule
        }

        {/* <GameOver/> */}
      </div>
    )
  }
}

export default PlayStage
