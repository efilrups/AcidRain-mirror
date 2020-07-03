import React, { Component } from 'react'
import "./css/GameOver.css"
import "98.css"
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
        const { userId, selectedStageName, score } = this.props
        return (
             <div className={"window GameOver-window"}>
                <div className="window-body">
                    <p className="GameOver-title" style={{ textAlign: "center" }}>게임 결과</p>


                    <fieldset className={"GameOver-fieldset"}>
                        <p className="description">{
                        `게임이 종료되었습니다. 
                        ${selectedStageName}스테이지에서 ${score}점을 받으셨습니다.`
                        } </p>
                        

                        <div className="field-row" style={{ justifyContent: 'center' }}>
                            <button onClick={()=>{
                            }}>확인</button>
                        </div>
                    </fieldset>
                </div>
            </div>
    
        )
    }
}

export default GameOver

