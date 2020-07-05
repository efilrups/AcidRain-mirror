import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import  GameOver  from './GameOver'

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      end : false,
      RAIN_MAX : 15,
      score : 0,
    }

    // canvas 관련 초기화
    this.canvas = null;
    this.ctx = null;
    this.randomArr = [];
    this.rain_count = 0;
    this.score = 0;
    this.life = 10;
    this.font = {
      fontSize : 15,
      fontName : 'arial'
    };
    this.missedCode = [];
    this.comment = '';

    this.start = this.start.bind(this);
    this.draw = this.draw.bind(this);
    this.deleteCode = this.deleteCode.bind(this);
  }

  // canvas에 그려질 내용들 설정
  componentDidMount() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    const { stageContents } = this.props
    const {  RAIN_MAX } = this.state;

    this.ctx.font = `${this.font.fontSize}px ${this.font.fontName}`;

    // 내려 보내줄 개수 만큼, 내려보내줄 랜덤배열 만들기
    for (let i = 0; i < RAIN_MAX; i++) {
      let randomContent =  stageContents[Math.floor(Math.random() * 100) %  stageContents.length];

      let contentInfo = this.ctx.measureText(randomContent);
      let x = Math.round(Math.random() * (this.canvas.width - 50))

      // '출력 시작지점(x) + 코드의 길이' 가 캔버스 가로보다 크면 넘치는 만큼 x를 줄여줌
      if (x + contentInfo.width > this.canvas.width) {
        x -= (x + contentInfo.width - this.canvas.width);
      }

      // 내려보내줄 코드와 시작 위치가 담긴 객체
      let codeObj = {
        code: randomContent,
        x : x,
        y : this.font.fontSize * 2.5
      };

      this.randomArr.push(codeObj);
    }
    this.start();
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
      let end = this.randomArr.every( obj => obj.code ==='');
      if (end || this.life === 0) {
        console.log('stop!');
        this.setState(state => ({
          score : state.score + this.score,
          end : !state.end
        }))
        clearInterval(move);
        }
    }.bind(this), 500);
  }

  draw () {
    this.ctx.fillStyle = '#D3D3D3';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`점수 : ${this.score}`, 10, this.font.fontSize + 5 );
    this.ctx.fillText(this.comment, 450, this.font.fontSize + 5 );

    // 내려가기 시작한 코드들을 하나씩 그리기
    for (let i = 0; i < this.rain_count; i++) {
      // 코드가 캔버스의 제일 아래에 내려가면 코드를 지운다.
      if (this.randomArr[i].y > this.canvas.height - (this.font.fontSize/ 10)) {
        if (this.randomArr[i].code !== '') {
          this.life -= 1;
          this.missedCode.push(this.randomArr[i].code);
        }
        this.randomArr[i].code = '';
      }

      // 코드 그리고 다음에 그릴 위치 내리기
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.randomArr[i].code, this.randomArr[i].x , this.randomArr[i].y)
      this.randomArr[i].y += this.font.fontSize;
    }

    // ph바 그라데이션 설정
    let gra = this.ctx.createLinearGradient(200, 5, 400, 5)
    gra.addColorStop(0, 'rgb(247, 44, 31)');
    gra.addColorStop(0.4, 'rgb(247, 187, 31)');
    gra.addColorStop(0.6, 'rgb(191, 247, 31)');
    gra.addColorStop(0.7, 'rgb(14, 207, 23)');
    gra.addColorStop(1, 'rgb(14, 67, 201)');

    // ph바 그리기
    this.ctx.fillText(`ph.${this.life + 1}`, 150, this.font.fontSize + 5);
    this.ctx.fillRect(195, 5, 210, 20);
    this.ctx.fillStyle = gra;
    this.ctx.fillRect(200, 7, this.life * 20, 16);
  }

  deleteCode(event) {
    if (event.key === 'Enter') {
      let targetIndex = this.randomArr.findIndex( obj => event.target.value === obj.code );
      this.comment = '다시 해보시죠?!';
      if (targetIndex !== -1 && this.randomArr[targetIndex].code !== '') {
        this.randomArr[targetIndex].code = '';
        this.comment = '지우기 성공!';
        this.score++;
        this.draw();
      }
      event.target.value = '';
    }

  }

  render() {
    const {userId, selectedStageName, stageContents,handleGameEnd, gameStartToggle } = this.props
    const { score } = this.state

    const gameEnd = (
      <input
        type='text'
        placeholder='게임 종료'
        style={{ textAlign: "center" }}
        disabled
      />
    );

    return (
      <div className='window-body gameBoard'>
        <canvas id='canvas' width="600" height="400" />

        <div style={{ textAlign: "center" }}>
          {
            this.state.end
            ? gameEnd
            : <input
              type='text'
              placeholder='산성비를 제거하세요'
              onKeyUp={this.deleteCode}
            />
          }
        </div>

        {
          this.state.end
          ? <GameOver userId={userId} selectedStageName={selectedStageName}
            stageContents={stageContents} score={score} missedCode={this.missedCode} 
            handleGameEnd={handleGameEnd} gameStartToggle={gameStartToggle} />
          : ''
        }


      </div>
    )
  }
}

export default Play
