import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './css/MakeStage.css'
const axios = require('axios');

class MakeStage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputStageName: this.props.editStageName,

            
            inputStageContents: this.props.editStageContents? this.props.editStageContents.join('\n') : this.props.editStageName
        }
        this.textInput = React.createRef();
    }
    handleStageName = (e) => {
        this.setState({inputStageName:e.target.value})
    }

    handleStageContents = (e) => {
        this.setState({inputStageContents:(e.target.value)})
    }
    

    render() {
        const { handleMakingStage, userId } = this.props
        return (
            <div>
                <div>
                    <div className="window Ranking-window">

                        <div className="window-body">

                            <div className="title-bar-controls">
                                <button className="closeButton" aria-label="Close" onClick={() => {
                                    handleMakingStage()
                                }}></button>
                            </div>

                            <p className="title" style={{ textAlign: "center" }}>스테이지 만들기</p>

                            <fieldset className="Ranking-fieldset">
                                <p className="description">나만의 스테이지를 만들어보세요!</p>

                                <div className="field-row" style={{ justifyContent: 'center' }}>
                                    <input className="MakeStage-stagename" placeholder="스테이지의 이름을 정해주세요." type="text" 
                                        onChange={this.handleStageName} value={this.state.inputStageName}
                                     ></input>
                                     
                                </div>

                                <div className="field-row-stacked" >
                                    <textarea className="MakeStage-stageContents" placeholder="한 줄에 작성한 글이 하나의 산성비가 됩니다.&#13;&#10;한 게임에 총 30개의 산성비가 떨어집니다.&#13;&#10;30개의 코드를 모두 작성하지 않으면 떨어진 비를 또 맞게 되겠죠?" 
                                     onChange={this.handleStageContents} value={this.state.inputStageContents}>
                                    </textarea>
                                </div>


                                <div className="field-row" style={{ justifyContent: 'center' }}>
                                    <button className="MakeStage-button" onClick={() => {
                                        //db에 저장하는 post요청, 창닫기 
                                        axios.post("http:localhost:5000/main/makestage",{
                                            userId: userId,
                                            stagename:this.state.inputStageName,
                                            contents:this.state.inputStageContents.split('\n')
                                        })
                                        //input값을 초기화해주기
                                        this.props.resetEditingHope()
                                        handleMakingStage()
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
