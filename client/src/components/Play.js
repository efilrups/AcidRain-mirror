import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import  GameOver  from './GameOver'

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // end : false,
      stop: false,
      // 나오는 코드의 개수
      RAIN_MAX : 15,
      score : 0,
      gameLevel: this.props.gameLevel,
      correctComment: ['지우기 성공!', '올ㅋ 꽤하시네요', '정답', '난이도를 올려봐요', '멋지네'],
      incorrectComment: ['ㅋ', '그것밖에 못합니까?', '다시 해보시죠', '에헤이 그러면쓰나', '타자 연습 더 하세요']
    }

    // canvas 관련 초기화
    this.canvas = null;
    this.ctx = null;
    this.randomArr = [];
    this.rain_count = 0;
    this.score = 0;
    this.life = 10;
    this.currentLife = this.life;
    this.font = {
      fontSize : 25,
      fontName : 'arial'
    };
    this.missedCode = [];
    this.comment = '';
    this.move = null;
    this.start = this.start.bind(this);
    this.draw = this.draw.bind(this);
    this.deleteCode = this.deleteCode.bind(this);
    this.gameStopRestartToggle = this.gameStopRestartToggle.bind(this);
    this.rangeChange = this.rangeChange.bind(this);
  }

  // canvas에 그려질 내용들 설정
  componentDidMount() {
    document.querySelector('.inputAnswer').focus();
    this.canvas = document.getElementById('canvas');

    //canvas의 크기 설정
    this.canvas.width = 1000;
    this.canvas.height = this.canvas.width * 0.6;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = `${this.font.fontSize}px ${this.font.fontName}`;

    const { stageContents } = this.props
    const {  RAIN_MAX } = this.state;

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
        y : 61 + this.font.fontSize
      };

      this.randomArr.push(codeObj);
    }
    this.draw();
    this.start();
  }

  componentWillUnmount () {
    console.log('The End');
    clearInterval(this.move);
  }

  start() {
    const { RAIN_MAX, gameLevel } = this.state;
    this.move = setInterval(function () {
      // 한 번도 안내려보냈으면 무조건 한 번 내려보내고 아니면 45퍼의 확률로 내려보내지 않음
      if (this.rain_count === 0) {
        this.rain_count++;
      } else if (this.rain_count < RAIN_MAX && (Math.random() * 10) > 4.5) {
        this.rain_count++;
      }

      this.draw();
      //코드들의 다음 위치 정하기
      for (let i = 0; i < this.rain_count; i++) {
        this.randomArr[i].y += this.font.fontSize;
      }

      // 마지막에 내려보낸 비의  다음에 그려질 y 위치가 캔버스의 높이보다 커지면 반복 끝
      let end = this.randomArr.every( obj => obj.code ==='');
      if (end || this.currentLife === 0) {
        console.log('stop!');
        this.setState(state => ({
          score : state.score + this.score,
          // end : !state.end
        }))
        this.props.gameStartToggle();
        clearInterval(this.move);
        }
    }.bind(this), 500 + (11 - gameLevel) * 100);
  }

  draw () {
    const { fontSize, fontName } = this.font;
    //canvas 배경
    this.ctx.fillStyle = this.props.color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 점수와 코멘트 피드백
    this.ctx.font = `30px ${fontName}`;
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`점수 : ${this.score}`, this.canvas.width * 0.05, 48);
    this.ctx.fillText(`난이도 : ${this.state.gameLevel}`, this.canvas.width * 0.2, 48);
    this.ctx.fillStyle = this.commentColor;
    this.ctx.fillText(this.comment, this.canvas.width * 0.75, 48);


    // 내려가기 시작한 코드들을 하나씩 그리기
    this.ctx.font = `${fontSize}px ${fontName}`;
    this.ctx.fillStyle = 'black';
    for (let i = 0; i < this.rain_count; i++) {
      // 코드가 캔버스의 제일 아래에 내려가면 코드를 지운다.
      if (this.randomArr[i].y > this.canvas.height - (fontSize/ 10)) {
        // 이미 지워진 코드가 아니면 life를 깎는다.
        if (this.randomArr[i].code !== '') {
          this.currentLife -= 1;
          this.missedCode.push(this.randomArr[i].code);
        }
        this.randomArr[i].code = '';
      }

      // 코드 그리기
      this.ctx.fillText(this.randomArr[i].code, this.randomArr[i].x , this.randomArr[i].y)
    }

    // ph바 그라데이션 설정
    let gra = this.ctx.createLinearGradient(this.canvas.width * 0.35, 0, this.canvas.width * 0.65, 0);
    gra.addColorStop(0, 'rgb(247, 44, 31)');
    gra.addColorStop(0.4, 'rgb(247, 187, 31)');
    gra.addColorStop(0.6, 'rgb(191, 247, 31)');
    gra.addColorStop(0.7, 'rgb(14, 207, 23)');
    gra.addColorStop(1, 'rgb(14, 67, 201)');

    // ph바 그리기
    this.ctx.font = `28px ${fontName}`;
    this.ctx.fillText(`ph.${this.currentLife + 1}`, this.canvas.width * 0.66, 45);
    this.ctx.fillRect(this.canvas.width * 0.345, 14, this.canvas.width * 0.31, 46);
    this.ctx.fillStyle = gra;
    this.ctx.fillRect(this.canvas.width * 0.35, 20, (this.canvas.width * 0.3) * (this.currentLife / this.life), 34);
  }

  deleteCode(event) {
    const { correctComment, incorrectComment } = this.state
    if (event.key === 'Enter') {
      let targetIndex = this.randomArr.findIndex( obj => event.target.value === obj.code );

      if (targetIndex !== -1 && this.randomArr[targetIndex].code !== '') {
        this.randomArr[targetIndex].code = '';
        this.commentColor ='rgb(31, 124, 247)';
        this.comment = correctComment[Math.floor(Math.random() * correctComment.length)];
        this.score++;
      } else {
        this.commentColor = 'rgb(143, 36, 2)';
        this.comment = incorrectComment[Math.floor(Math.random() * incorrectComment.length)];
      }
      this.draw();
      event.target.value = '';
    }
}

  gameStopRestartToggle() {
    if (!this.state.stop) {
      clearInterval(this.move);
    } else {
      this.start();
    }
    this.setState(state=>({
      stop: !state.stop
    }));
    document.querySelector('.inputAnswer').focus();
  }

  rangeChange (obj) {
      this.setState({
          gameLevel: document.getElementById('gameLevel').value
      });
  }

  onKeyPressed = (e) => {
    console.log(e.key)
    if(e.key === 'Escape'){
      console.log('escape')
      this.props.history.push('/selectStage');
    } else if (e.key === 'Enter'){
      this.gameStopRestartToggle()
    }
  }

  render() {
    const {userId, selectedStageName, stageContents, gameStartToggle, gameLevel } = this.props
    const { score } = this.state

    const gameEnd = (
      <input
        className='inputAnswer'
        type='text'
        placeholder='게임 종료'
        style={{ textAlign: "center" }}
        disabled
      />
    );

    return (
      <div className='window-body gameBoard'>
      
        <canvas id='canvas'/>

        <div>
          {
            !this.props.gameStart
            ? gameEnd
            :
            <div>
              <input
                className='inputAnswer'
                type='text'
                placeholder='산성비를 제거하세요'
                style={{ textAlign: "center" }}
                onKeyPress={this.deleteCode}
                disabled={ this.state.stop ? true : false }
              />
              <div/>

              <button
                className="stop"
                onClick={this.gameStopRestartToggle}>
                  { this.state.stop ? '재시작' : '멈춤' }
              </button>
              {
                this.state.stop
                ? <div className="selectGameLevel" style={{ textAlign: 'center' }}>
                    <div>난이도 재설정을 해보세요 (1 - 10)</div>
                    <input type="range" id='gameLevel' defaultValue={this.state.gameLevel}  min={1} max={10} step={1} onChange={this.rangeChange}/>
                    <div> 현재 난이도 : {this.state.gameLevel} </div>
                </div>
                : ''
              }
            </div>
          }
        </div>

        {
          !this.props.gameStart
          ? <GameOver userId={userId} selectedStageName={selectedStageName}
            stageContents={stageContents} score={score} missedCode={this.missedCode}
            gameStartToggle={gameStartToggle} />
          : ''
        }
      </div>
    )
  }
}

export default withRouter(Play)
