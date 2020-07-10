import React, { Component } from 'react'
import "./css/GameOver.css"
import "98.css"
import { withRouter } from 'react-router-dom'
const axios = require('axios');

class GameOver extends Component {
    constructor(props) {
        super(props)
    }


    onKeyPressed = (e) => {
        if (e.key === "Enter") {
            this.props.history.push('/ranking')
        }
    }

    async componentDidMount() {
        document.getElementById('gameOverFocus').focus()
        //유저의 방금 게임 정보를 서버에 보내주기
      const { userId, selectedStageName,  score, missedCode } = this.props
      await axios.post('http://13.125.33.38:5000/main/gameover', {
        missedcode:JSON.stringify(missedCode),
        score: score,
        nickname: userId,
        stagename: selectedStageName,
     })
    }

    render() {
        const { userId, selectedStageName, score, missedCode, resetGameLevel, resetStageContents } = this.props
        return (
            <div className="window GameOver-window" id="gameOverFocus" onKeyDown={(e) => {
                this.onKeyPressed(e)
                resetGameLevel()
                resetStageContents()
            }} tabindex="0">
                <div className="window-body">
                    <p className="GameOver-title" style={{ textAlign: "center" }}>게임 결과</p>


                    <fieldset className={"GameOver-fieldset"}>
                        <p className="GameOver-description">[{selectedStageName}]스테이지에서 {score}점을 받으셨습니다.</p>



                        <div className="field-row" style={{ justifyContent: 'center' }}>
                            <button className="gameoverBtn" onClick={() => {
                                resetStageContents()
                                resetGameLevel()
                                this.props.history.push('/ranking') // 여기서 랭킹으로 이동
                            }}>확인</button>
                        </div>
                    </fieldset>
                </div>
            </div>

        )
    }
}

export default withRouter(GameOver)
