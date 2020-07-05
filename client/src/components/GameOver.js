import React, { Component } from 'react'
import "./css/GameOver.css"
import "98.css"
import { withRouter } from 'react-router-dom'
const axios = require('axios');

class GameOver extends Component {
    constructor(props){
        super(props)
    }



    async componentDidMount() {
        //유저의 방금 게임 정보를 서버에 보내주기
        const { userId, selectedStageName,  score, missedCode } = this.props
     await axios.post('http://localhost:5000/main/gameover', {
         userId : userId,
         selectedStageName: selectedStageName,
         score : score,
         missedCode: missedCode
     })
    }

    render() {
        const { userId, selectedStageName, score, missedCode} = this.props
        return (
             <div className={"window GameOver-window"}>
                <div className="window-body">
                    <p className="GameOver-title" style={{ textAlign: "center" }}>게임 결과</p>


                    <fieldset className={"GameOver-fieldset"}>
                        <p className="GameOver-description">게임이 종료되었습니다.</p>
                        <p className="GameOver-description">{selectedStageName}스테이지에서 {score}점을 받으셨습니다.</p>
                        


                        <div className="field-row" style={{ justifyContent: 'center' }}>
                            <button onClick={()=>{
                                //게임이 끝나면 현재 스테이지값, 스테이지컨텐츠값, 게임 중이라는 상태 모두 초기화 해줌
                                //missedCode를 server로 보내줌
                                axios.post('http://localhost:5000/main/gameover',{
                                    userId: userId,
                                    stageId:selectedStageName,
                                    score:score,
                                    missedCode:missedCode
                                })
                                this.props.handleGameEnd()
                                this.props.gameStartToggle()
                                this.props.history.push('/ranking')
                            }}>확인</button>
                        </div>
                    </fieldset>
                </div>
            </div>

        )
    }
}

export default withRouter(GameOver)
