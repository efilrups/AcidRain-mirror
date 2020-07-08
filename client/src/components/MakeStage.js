import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './css/MakeStage.css'
const axios = require('axios');

class MakeStage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputStageName: this.props.editStageName,
            inputStageContents: this.props.editStageContents ? this.props.editStageContents.join('\n') : this.props.editStageName
        }
        this.textInput = React.createRef();
    }
    handleChange = (e) => {
        this.setState({ [e.target.className]: e.target.value })
    }

    onKeyPressed = (e) => {

        if (e.key === 'Escape') {
            this.props.resetEditingHope()
            this.props.handleMakingStage()
          
        }
    }

    render() {
        const { handleMakingStage, userId, resetEditingHope } = this.props
        const { inputStageName, inputStageContents } = this.state
        return (
            <div>
                <div>
                    <div className="window Ranking-window" onKeyDown={this.onKeyPressed}>

                        <div className="window-body">

                            <div className="title-bar-controls">
                                <button className="closeButton" aria-label="Close" onClick={() => {
                                    resetEditingHope()
                                    handleMakingStage()
                                }}></button>
                            </div>

                            <p className="title" style={{ textAlign: "center" }}>스테이지 만들기</p>

                            <fieldset className="Making-fieldset">
                                <p className="description">나만의 스테이지를 만들어보세요!</p>

                                <div className="field-row" style={{ justifyContent: 'center' }}>
                                    <input className="inputStageName" placeholder="스테이지의 이름을 정해주세요." type="text"
                                        onChange={this.handleChange} value={inputStageName}
                                    ></input>
                                </div>

                                <div className="field-row-stacked" >
                                    <textarea className="inputStageContents" placeholder="한 줄에 작성한 글이 하나의 산성비가 됩니다.&#13;&#10;한 게임에 총 30개의 산성비가 떨어집니다.&#13;&#10;30개의 코드를 모두 작성하지 않으면 떨어진 비를 또 맞게 되겠죠?"
                                        onChange={this.handleChange} value={inputStageContents}>
                                    </textarea>
                                </div>


                                <div className="field-row" style={{ justifyContent: 'center' }}>
                                    <button className="MakeStage-button" onClick={() => {
                                        //db에 저장하는 post요청, 창닫기 
                                        // console.log('inputStageName: ', inputStageName);
                                        // if(userId){

                                          console.log('inputStageContents.split(): ', inputStageContents.split('\n'));
                                        axios.post("http://localhost:5000/main/makestage", {
                                            userId: userId,
                                            stagename: inputStageName,
                                            contents: JSON(inputStageContents.split('\n'))
                                        }).then(res => {
                                            alert(res.data.message)
                                        })
                                        //input값을 초기화해주기
                                        resetEditingHope()
                                        handleMakingStage()
                                        // } 
                                    }}>저장</button>
                                </div>

                            </fieldset>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MakeStage)
