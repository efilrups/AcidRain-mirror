import React, { Component } from 'react'
<<<<<<< HEAD
const axios = require('axios');

=======
import { Route } from 'react-router-dom'
import  GameOver  from './GameOver'
>>>>>>> bcd3d19870fd48109f7a67d19878997379e0c06b
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
      gameOverToggle : props.gameOverToggle,
      enterkey : props.enterkey,
      end : false,
      RAIN_MAX : 15,
      score : 0,
      missedCode: []
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

    this.start = this.start.bind(this);
    this.draw = this.draw.bind(this);
    this.deleteCode = this.deleteCode.bind(this);
    this.postGameResult = this.postGameResult.bind(this);
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
<<<<<<< HEAD
        }
    }.bind(this), 500);
  }

  draw () {
    this.ctx.fillStyle = 'rgb(179, 179, 179)';
=======
      }
    }.bind(this), 1000);
  }

  draw() {
    this.ctx.fillStyle = 'gray';
>>>>>>> bcd3d19870fd48109f7a67d19878997379e0c06b
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`점수 : ${this.score}`, 10, this.font.fontSize + 5 );

    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(0, this.canvas.height - 3 - this.font.fontSize, 600, 2);
    // console.log('==============================');
    for (let i = 0; i < this.rain_count; i++) {
      // 코드가 캔버스의 제일 아래에 내려가면 코드를 지운다.
      if (this.randomArr[i].y > this.canvas.height - (this.font.fontSize/ 10)) {
        if (this.randomArr[i].code !== '') {
          this.life -= 1;
        }
        this.randomArr[i].code = '';
      }

      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.randomArr[i].code, this.randomArr[i].x , this.randomArr[i].y)
      this.randomArr[i].y += this.font.fontSize;
    }

    // ph바 그라데이션 설정 및 그리기
    let gra = this.ctx.createLinearGradient(200, 5, 400, 5)
    gra.addColorStop(0, 'rgb(247, 44, 31)');
    gra.addColorStop(0.4, 'rgb(247, 187, 31)');
    gra.addColorStop(0.6, 'rgb(191, 247, 31)');
    gra.addColorStop(0.7, 'rgb(14, 207, 23)');
    gra.addColorStop(1, 'rgb(14, 67, 201)');

    this.ctx.fillText(`ph.${this.life + 1}`, 150, this.font.fontSize + 5);
    this.ctx.fillRect(195, 5, 210, 20);
    this.ctx.fillStyle = gra;
    this.ctx.fillRect(200, 7, this.life * 20, 16);
  }

  deleteCode(event) {
    if (event.key === 'Enter') {
      let targetIndex = this.randomArr.findIndex( obj => event.target.value === obj.code );
      console.log('--OUt---targetIndex---', targetIndex);
      if (targetIndex !== -1 && this.randomArr[targetIndex].code !== '') {
        this.randomArr[targetIndex].code = '';
        console.log('this.state.score---',this.state.score);
        console.log('--In---targetIndex---', targetIndex);
        // this.setState((state) =>({ score : state.score + 1 }));
        this.score++;
        this.draw();
      }
      event.target.value = '';
    }

  }

  postGameResult () {
    const { score } = this.state
    console.log(score);
    // axios.post('http://localhost:5000/main/playstage')
    this.state.gameOverToggle();
  }

  render() {
    const {userId, selectedStageName, stageContents } = this.props
    const { score, missedCode } = this.state

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
<<<<<<< HEAD
        {/* {this.state.end ? this.postGameResult() : ''} */}
=======

        <input
          type='button'
          value='되돌아가기'
          onMouseUp={this.state.isPlayingToggle}
          onKeyUp={this.state.enterkey} />


        <GameOver userId={userId} selectedStageName={selectedStageName}
          stageContents={stageContents} score={score} missedCode={missedCode}  />
          
>>>>>>> bcd3d19870fd48109f7a67d19878997379e0c06b
      </div>
    )
  }
}

export default Play
