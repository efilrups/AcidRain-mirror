import React, { Component } from 'react'
import { Route } from 'react-router-dom';
// import { GameOver } from '../components'

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
    if (this.state.isPlaying) {
      this.gameRule.setAttribute('style','display:block');
      this.gameBoard.setAttribute('style','display:none');
    } else {
      this.gameRule.setAttribute('style','display:none');
      this.gameBoard.setAttribute('style','display:block');
    }
  }

  render() {
    return (
      <div>
        <div className='gameRule' ref={ref=>this.gameRule=ref}>
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
            // onClick={this.isPlayingToggle}
            onMouseUp={this.isPlayingToggle}
            onKeyUp={this.enterkey} />
        </div>

        <div className='gameBoard' style={{display:'none'}} ref={ref=>this.gameBoard=ref}>
          게임 드응자앙!
          <input
            type='button'
            value='되돌아가기'
            // onClick={this.isPlayingToggle}
            onMouseUp={this.isPlayingToggle}
            onKeyUp={this.enterkey} />
        </div>
        {/* <GameOver/> */}
      </div>
    )
  }
}

export default PlayStage
