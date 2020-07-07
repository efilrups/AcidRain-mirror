import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { StageListEntry } from '../components';
import { MakeStage } from '../components/index'
import './css/SelectStage.css'
import "98.css"
const axios = require('axios');

class SelectStage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savedStages: [],
            editStageName: '',
            editStageContents: '',
            gameLevel: 1
        }
        this.rangeChange = this.rangeChange.bind(this);
    }
    componentWillMount() {

    }

    handleEditStageName = (stageName) => {
        this.setState({ editStageName: stageName })
    }

    handleEditStageContents = (editStageContents) => {
        this.setState({ editStageContents: editStageContents })
    }

    resetEditingHope = () => {
        this.setState({
            editStageName: '',
            editStageContents: ''
        })
    }

    rangeChange(obj) {
        this.setState({
            gameLevel: document.getElementById('gameLevel').value
        });
    }

    async componentDidMount() {
        //selectStage 경로로 이동하면 stage테이블에 저장된 데이터를 모두 가져오고 stageNames에 담김
        await axios.get('http://localhost:5000/main/selectstage')
            .then(res => {
                this.setState({ savedStages: res.data })
            })

    }

    render() {
        const { clickStage, selectedStageName, wantToMake, handleMakingStage, userId } = this.props
        const { editStageContents, editStageName, gameLevel } = this.state
        return (
            <div className="window SelectStage-window">
                <div className="window-body">
                    <p className="title" style={{ textAlign: "center" }}>스테이지 선택</p>


                    <fieldset>
                        <p className="description">스테이지를 선택하세요 !</p>
                        <ul className="tree-view selectStage-treeview">
                            <table>
                                <thead>
                                    <tr className="selectingHead">
                                        <th className>스테이지</th>
                                        <th className>만든이</th>
                                        <th className>수정/삭제</th>
                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.savedStages.map((savedStage, i) => (
                                        <StageListEntry
                                            //isSelected:선택한 stage이름과 현재 stage가 같다면
                                            isSelected={selectedStageName === savedStage.stagename}
                                            stageName={savedStage.stagename}
                                            createdBy={savedStage.createdBy}
                                            clickStage={clickStage}
                                            key={i}
                                            editStageName={editStageName}
                                            editStageContents={editStageContents}
                                            selectedStageName={selectedStageName}
                                            handleEditStageContents={this.handleEditStageContents}
                                            handleEditStageName={this.handleEditStageName}
                                            handleMakingStage={handleMakingStage}
                                            userId={userId}
                                            refresh={this.refresh}
                                        />

                                    ))}
                                </tbody>
                            </table>
                        </ul>

                        <div className="selectGameLevel" style={{ textAlign: 'center' }}>
                            <div>플레이 할 난이도를 선택하세요 (1 - 10)</div>
                            <input type="range" id='gameLevel' defaultValue="1" min={1} max={10} step={1} onChange={this.rangeChange} />
                            <div > 현재 난이도 : {gameLevel} </div>
                        </div>

                        <div className="field-row SelectStage-buttons" style={{ justifyContent: 'center' }}>
                            <button onClick={() => {
                                //버튼 누르면 서버에 현재 선택한 stageName을 post요청으로 보내고, 해당 stageName에 대한 content를 받아온다.
                                ///playstage로 이동
                                axios.post("http://localhost:5000/main/playstage", {
                                    stagename: selectedStageName,
                                    userid: userId
                                })
                                    .then(res => {
                                        this.props.getContents(JSON.parse(res.data[0].contents), gameLevel)
                                    })
                                this.props.history.push('/playstage')

                            }}>플레이</button>
                            <button onClick={() => {
                                //모달의 오픈,클로즈 여부를 관리하는 이벤트를 실행시킴
                                handleMakingStage()
                            }}>만들기</button>
                            {wantToMake ? <MakeStage handleMakingStage={handleMakingStage} userId={userId}
                                editStageName={editStageName}
                                editStageContents={editStageContents}
                                resetEditingHope={this.resetEditingHope} />
                                : ''}
                        </div>
                    </fieldset>
                </div>
            </div>

        )
    }
}

export default withRouter(SelectStage)
