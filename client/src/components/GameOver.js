import React, { Component } from 'react'
import "./css/GameOver.css"
import "98.css"
const axios = require('axios');

class GameOver extends Component {
    /*
    1. app.js에서 받은 userid, missedCode, score ,stageName를 componentdidmount로 https://localhost:5000
/gameover에 post 요청

    2. 화면에 보여주기
    */
    
    render() {
        return (
             <div className={"window GameOver-window"}>
                <div className="window-body">
                    <p className="GameOver-title" style={{ textAlign: "center" }}>게임 결과</p>


                    <fieldset className={"GameOver-fieldset"}>
                        <p className="description"></p>
                        

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

