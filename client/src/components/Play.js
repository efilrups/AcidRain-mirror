import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [
        'function foo()',
        'let x = 0',
        'Math.floor()',
        'setTimeout(function, 1000)',
        'array.push()',
        'Boolean(10 > 9)',
        'if (day == "Monday"){ return true }'
      ],
      RAIN_MAX: 15,
      isPlayingToggle: props.isPlayingToggle,
      enterkey: props.enterkey
    }

    // canvas 관련 초기화
    this.canvas = null;
    this.ctx = null;
    this.randomArr = [];
    this.rain_count = 0;
    this.font = {
      fontSize: 25,
      fontName: 'arial'
    };

    this.start = this.start.bind(this);
    this.draw = this.draw.bind(this);
    this.deleteCode = this.deleteCode.bind(this);
  }

  // canvas에 그려질 내용들 설정
  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    const { contents, RAIN_MAX } = this.state;

    this.ctx.font = `${this.font.fontSize}px ${this.font.fontName}`;

    // 내려 보내줄 개수 만큼, 내려보내줄 랜덤배열 만들기
    for (let i = 0; i < RAIN_MAX; i++) {
      let randomContent = contents[Math.floor(Math.random() * 100) % contents.length];

      let contentInfo = this.ctx.measureText(randomContent);
      let x = Math.round(Math.random() * (this.canvas.width - 50))

      // '출력 시작지점(x) + 코드의 길이' 가 캔버스 가로보다 크면 넘치는 만큼 x를 줄여줌
      if (x + contentInfo.width > this.canvas.width) {
        x -= (x + contentInfo.width - this.canvas.width);
      }

      // 내려보내줄 코드와 시작 위치가 담긴 객체
      let codeObj = {
        code: randomContent,
        x: x,
        y: this.font.fontSize
      };

      this.randomArr.push(codeObj);
    }
  }

  start() {
    const { RAIN_MAX } = this.state;
    let move = setInterval(function () {
      // 한 번도 안내려보냈으면 무조건 한 번 내려보내고 아니면 45퍼의 확률로 내려보내지 않음
      if (this.rain_count === 0) {
        this.rain_count++;
      } else if (this.rain_count < RAIN_MAX && (Math.random() * 10) > 4.5) {
        this.rain_count++;
      }

      this.draw();

      // 마지막에 내려보낸 비의  다음에 그려질 y 위치가 캔버스의 높이보다 커지면 반복 끝
      if (this.randomArr[this.rain_count - 1].y > this.canvas.height) {
        console.log('stop!');
        clearInterval(move);
      }
    }.bind(this), 1000);
  }

  draw() {
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // console.log('==============================');
    for (let i = 0; i < this.rain_count; i++) {
      // console.log(this.randomArr[i]);
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.randomArr[i].code, this.randomArr[i].x, this.randomArr[i].y)
      this.randomArr[i].y += this.font.fontSize;

      // 코드가 캔버스의 제일 아래에 내려가면 코드를 지운다.
      if (this.randomArr[i].y > this.canvas.height - (this.font.fontSize / 10)) {
        this.randomArr[i].code = '';
      }
    }
  }

  deleteCode(event) {
    if (event.key === 'Enter') {
      let targetIndex = this.randomArr.findIndex(obj => event.target.value === obj.code);
      if (targetIndex !== -1) {
        this.randomArr[targetIndex].code = '';
        this.draw();
      }
      event.target.value = '';
    }

  }

  render() {
    const { userId, selectedStageName, stageContents, missedCode, score } = this.props

    return (
      <div className='gameBoard'>
        게임 드응자앙!
        <canvas id='canvas' width="800" height="500" >
          {this.start()}
        </canvas>

        <input type='button' value="test" onClick={this.deleteCode} />

        <input
          type='text'
          placeholder='산성비를 제거하세요'
          onKeyUp={this.deleteCode}
        />

        <input
          type='button'
          value='되돌아가기'
          onMouseUp={this.state.isPlayingToggle}
          onKeyUp={this.state.enterkey} />

        <Route path='/gameover' render={() => <GameOver userId={userId} selectedStageName={selectedStageName}
          stageContents={stageContents} missedCode={missedCode} score={score} />} />
      </div>
    )
  }
}

export default Play
