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
            stageNames: ['stage1', 'stage2', 'stage3', 'stage4', 'stage5']
        }
    }

    async componentDidMount() {
        // /selectStage 경로로 이동하면 stage테이블에 저장된 데이터를 모두 가져오고 stageNames에 담김
        // await axios.get('https://localhost:5000/selectstage')
        //     .then(res => {
        //         let names = []
        //         for (let objData of res.data) {
        //             if ('stageName' in objData) {
        //                 names.push(objData['stageName'])
        //             }
        //         }
        //         this.setState({ stageNames: names })
        //     })

    }

    render() {
     const {clickStage,selectedStageName} = this.props
      return (
            <div className="window">
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
                                // axios.post("https://localhost:5000/playstage",this.props.stageName)
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

/**
 *버튼 클릭하면 server에 post 요청.--> 받은 content를 app에 저장 
 *(/playstage로 이동) -->api 수정, playStage에서 content얻어오는게 post요청으로
 */

/*
{
    "stages": [
                 {
                   "stageName":
                   "created_by":
                  }
               ]
}
 */

/*

2. selectstage 라우터로 이동 시에 보여지는 컴포넌트 selectstage

1. componentDidMount로 시작하면 state에 stage목록을 담아주기
https://localhost:5000/selectstage 에서 get요청으로

2. 클릭한 stage명이 App의 현재 state값을 바꾸도록 이벤트 지정


*/