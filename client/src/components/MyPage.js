import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "./css/MyPage.css"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const axios = require('axios')


class MyPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nickname: this.props.userId,
            myPlayLogs: [

            ],
            placeholder: "수정할 닉네임을 입력하세요",
            // value: ""

        }
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
    }

    handleNicknameChange() {
        const { userId, changeUserId } = this.props
        axios.post('http://localhost:5000/main/mypage', {
            // 기존 유저정보의 닉네임 (this.state에서 가지고 오기)
            nickname: userId,
            // 인풋 밸류로 수정할 닉네임을 받아주기
            newnickname: this.state.nickname
        })
        // Nav바에 보이는 닉네임 바꾸기
        changeUserId(this.state.nickname)
        // * 이제 확인해봐야할 것은 플레이스 홀더가 다시 초기화로 바뀌는지
        // * alert 메시지에 이미 존재하는 닉네임입니다 뜰 수 있게 변경
        alert("닉네임이 수정되었습니다.")

        // this.setState({
        //     placeholder: "수정할 닉네임을 입력하세요",
        //     value: ""
        // }, () => alert("닉네임이 수정되었습니다."))

    }

    handleInputValueChange(e) {
        this.setState({
            nickname: e.target.value
        })
    }

    // handleInputDefalutValue(){
    //     this.setState({
    //         nickname:this.props.userId
    //     })
    // }

    componentDidMount() {
        const { userId } = this.props
        axios.post('http://localhost:5000/main/mypage', {
            nickname: userId
        })

            // * state에 들어간 playlog를 화면에 표시하는 방법
            .then(res => {
                // myPlayLog (스테이지, 스코어) 를 객체로 받아와서 state에 푸쉬
                let myPlayLogs = []
                let myPlayLog = {}

                for (let i = 0; i < res.data[0].playlogs.length; i++) {
                    if (res.data[0].playlogs[i]) {
                        myPlayLog["stagename"] = res.data[0].playlogs[i].stagename
                        myPlayLog["score"] = res.data[0].playlogs[i].score
                        myPlayLogs.push(myPlayLog)
                    }
                }

                // console.log(myPlayLogs) 
                this.setState({
                    myPlayLogs: myPlayLogs
                })
                this.setState({
                    myPlayLogs: res.data
                })
            })
            .catch(err => {
                alert('이미 존재하는 닉네임입니다.')
            })
        // console.log('mount 성공')
    }
    // TO DO LIST
    // * 순위를 가져올 수 있나?
    // * CSS 위치 수정

    render() {
        return (
            <div>
                <div>
                    <div className="window MyPage-window">
                      <div className="title-bar">
                        <div className="title-bar-controls">
                          <div className="title-bar-text">Mypage</div>
                            <button className="closeButton" aria-label="Close" onClick={() => {
                                this.props.history.goBack()
                            }}></button>
                        </div>
                      </div>
                        <div className="window-body">
                            <p className="title" style={{ textAlign: "center" }}>마이페이지</p>
                            <fieldset id="mypageField">
                                <div className="field-row" style={{ justifyContent: 'center' }}>
                
                                        <input className="inputMypage"
                                            type="text"
                                            // placeholder={this.state.placeholder}
                                            value={this.state.nickname}
                                            onChange={this.handleInputValueChange}
                                            size="40"
                                        />
                                        <button button onClick={this.handleNicknameChange}>닉네임 변경</button>
                                    
                                </div>
                                 
                                <p className="title" style={{ textAlign: "center" }}>내 게임 기록</p>
                                 
                                <div className="myplayLog">
                                    <BootstrapTable data={this.state.myPlayLogs}
                                        bordered={false}
                                        headerStyle={{ 'fontStyle': 'black', 'borderBottom': 'black 0.05rem solid', 'marginBottom': '1rem', 'marginTop': '1rem', 'paddingBottom': '1rem' }}
                                        containerStyle={{ 'borderBottom': 'black solid 0.05rem', 'paddingBottom': '1rem' }}
                                    >
                                        <TableHeaderColumn dataField='id' dataAlign='center' isKey={true} tdStyle={{ 'fontSize': '1rem', paddingRight: '2rem' }} thStyle={{ 'fontSize': '1rem', paddingLeft: '1rem', paddingRight: '3rem' }}>순위</TableHeaderColumn>
                                        <TableHeaderColumn dataField='stagename' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight: '2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight: '3rem' }}>스테이지</TableHeaderColumn>
                                        <TableHeaderColumn dataField='score' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight: '2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight: '3rem' }}>점수</TableHeaderColumn>

                                    </BootstrapTable>
                                </div>

                                <div className="field-row" style={{ justifyContent: 'center' }}>
                                    <button
                                        className="playbutton"
                                        onClick={() => this.props.history.push("/selectStage")}
                                    >게임하러 가기</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>







                </div>
            </div>
        )
    }
}

export default withRouter(MyPage)
