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
            editStageContents: ''
        }
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

    async componentDidMount() {
        //selectStage 경로로 이동하면 stage테이블에 저장된 데이터를 모두 가져오고 stageNames에 담김
        await axios.get('http://localhost:5000/main/selectstage')

            .then(res => {

                this.setState({ savedStages: res.data })
            })

    }

    render() {
        const { clickStage, selectedStageName, wantToMake, handleMakingStage, userId } = this.props
        return (
            <div className="window SelectStage-window">
                <div className="window-body">
                    <p className="title" style={{ textAlign: "center" }}>스테이지 선택</p>


                    <fieldset>
                        <p className="description">스테이지를 선택하세요 !</p>
                        <ul className={"tree-view"}>
                            <tr>
                                <th scope="col" className="StageListEntry-stagename">스테이지</th>
                                <th scope="col" className="StageListEntry-createdBy">닉네임</th>

                            </tr>

                            {this.state.savedStages.map((savedStage, i) => (
                                <StageListEntry
                                    //isSelected:선택한 stage이름과 현재 stage가 같다면
                                    isSelected={selectedStageName === savedStage.stagename}
                                    stageName={savedStage.stagename}
                                    createdBy={savedStage.createdBy}
                                    clickStage={clickStage}
                                    key={i}
                                    editStageName={this.state.editStageName}
                                    editStageContents={this.state.editStageContents}
                                    selectedStageName={selectedStageName}
                                    handleEditStageContents={this.handleEditStageContents}
                                    handleEditStageName={this.handleEditStageName}
                                    handleMakingStage={handleMakingStage}
                                />

                            ))}
                        </ul>

                        <div className="field-row" style={{ justifyContent: 'center' }}>
                            <button onClick={() => {
                                //버튼 누르면 서버에 현재 선택한 stageName을 post요청으로 보내고, 해당 stageName에 대한 content를 받아온다. 
                                ///playstage로 이동
                                axios.post("http://localhost:5000/main/playstage", {
                                    stagename: selectedStageName
                                })
                                    .then(res => {
                                        // console.log((JSON.parse(res.data[0].contents)))
                                        this.props.getContents(JSON.parse(res.data[0].contents))
                                    })
                                this.props.history.push('/playstage')

                            }}>플레이</button>
                            <button onClick={() => {
                                //wantToMake 만들기 버튼 클릭하면 makingStage로 이동, 
                                //MakingStage컴포넌트 내의 만들기 완성버튼, x 버튼 클릭하면 다시 여기로 돌아오기
                               
                               //editStage에 관한 스테이츠를 모두 비워줘야한다.
                                handleMakingStage()

                            }}>만들기</button>
                            {wantToMake ? <MakeStage handleMakingStage={handleMakingStage} userId={userId}
                                editStageName={this.state.editStageName}
                                editStageContents={this.state.editStageContents}
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
