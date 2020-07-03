import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { StageListEntry } from '../components';
import './css/SelectStage.css'
import "98.css"
const axios = require('axios');

class SelectStage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stageNames: []
        }
    }

    async componentDidMount() {
        //selectStage 경로로 이동하면 stage테이블에 저장된 데이터를 모두 가져오고 stageNames에 담김
        await axios.get('http://13.125.33.38:5000/main/selectstage')
            .then(res => {
                let stageNames = []
                for (let objData of res.data) {
                    if ('stagename' in objData) {
                        stageNames.push(objData['stagename'])
                    }
                }
                this.setState({ stageNames: stageNames })
            })

    }

    render() {
     const {clickStage,selectedStageName} = this.props
      return (
            <div className="window SelectStage-window">
                <div className="window-body">
                    <p className="title" style={{ textAlign: "center" }}>스테이지 선택</p>


                    <fieldset>
                        <p className="description">스테이지를 선택하세요 !</p>
                        <ul className="tree-view">
                            {this.state.stageNames.map((stageName, i) => (
                             
                                <StageListEntry
                                    isSelected={selectedStageName === stageName}
                                    stageName={stageName}
                                    clickStage={clickStage}
                                    key={i}
                            
                                />
                              
                            ))}
                        </ul>

                        <div className="field-row" style={{ justifyContent: 'center' }}>
                            <button onClick={()=>{
                                //버튼 누르면 서버에 현재 선택한 stageName을 post요청으로 보내고, 해당 stageName에 대한 content를 받아온다. 
                                ///playstage로 이동
                                // axios.post("http://localhost:5000/main/playstage",this.props.stageName)
                                // .then(res=>{
                                //     this.props.getContent(res.data)
                                    this.props.history.push('/playstage')
                                // })
                            }}>플레이</button>
                        </div>
                    </fieldset>
                </div>
            </div>

        )
    }
}

export default withRouter(SelectStage)
