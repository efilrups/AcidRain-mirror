import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import "./css/MyPage.css"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const axios = require('axios')


class MyPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // 여기서 기존 닉네임을 받아오는 방법
            nickname: this.props.userId,
            myPlayLogs: [
                
            ],
            placeholder: "수정할 닉네임을 입력하세요",
            // value: ""
            
        }
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
    }

    handleNicknameChange(){
        const { userId, changeUserId } = this.props

        console.log(this.props.userId)

        axios.post('http://localhost:5000/main/mypage', {
            //// 기존 유저정보의 닉네임 (this.state에서 가지고 오기)
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

    handleInputValueChange(e){
        this.setState({
            nickname: e.target.value
        })
        console.log(this.state.value)
    }

    componentDidMount() {
        const { userId } = this.props

        axios.post('http://localhost:5000/main/mypage', {
            nickname: userId
        })
        // 여기서 해야하는게 보내준 닉네임에 따른 정보만 가지고 오기
        // post에서 첫 화면 구성은 됐는데 404 정보가 존재하지 않습니다가 문제다 그러니까 유저 정보 회원가입된걸 가져와야함
        // * res.body가 NOT iterable -> 그러면 res.body가 뭐지? undefined네..
        // * nickname을 서버에 보내주고 서버에서 가져온 res를 state에 넣어주기
        // * state에 들어간 playlog를 화면에 표시하는 방법
            .then(res => {
                // myPlayLog (스테이지, 스코어) 를 객체로 받아와서 state에 푸쉬
                let myPlayLogs = []
                let myPlayLog = {}
                // 여기서 res를 콘솔에 찍어보고 수정하고 싶은데
                //console.log(res.data[0].playlogs)
                for (let i=0; i<res.data[0].playlogs; i++){
                    myPlayLog["stagename"] = res.data[0].playlogs[i].stagename
                    myPlayLog["score"] = res.data[0].playlogs[i].score
                    myPlayLogs.push(myPlayLog)
                }
                // for (let playlogKey of res.body) {
                //     if ('stagename' in playlogKey) {
                //         myPlayLog.stagename = playlogKey['stagename'];
                //     } else if ('score' in playlogKey) {
                //         myPlayLog.score = playlogKey['score'];
                //     }
                //     myPlayLogs.push(myPlayLog)
                // }
                console.log(myPlayLogs)
                this.setState({
                    myPlayLogs: myPlayLogs
                })
            })
            .catch(err => {
                alert('로그인 후에 이용해주세요.')
            })
            console.log('mount 성공')
    }
    // TO DO LIST
    //// nickname 입력 칸 + 수정 버튼
    // * myPlayLogs 출력 (stage, score, missedcode)
    // 이것도 req.body에 내용을 담아주려면 get요청이 아니라 post요청이 되어야 하는데 post를 2개 받을 수가 있나?
    //// 게임하기를 누르면 selectStage 로 이동
    //// 닉네임 변경하면 알림 띄우기 (닉네임이 수정되었습니다.)
    // 순위를 가져올 수 있나?
    //// 로그인 된 user 정보를 받아오는 방법
    // * CSS 위치 수정
    //// 렌더가 왜 두번되지ㅠㅠ엉엉 (App.js에 추가하면 그렇다)

    render() {
        return (
            <div>
                <div>
                <div className="window MyPage-window">
                <div className="window-body">
                    <p className="title" style={{ textAlign: "center" }}>마이페이지</p>
                    <fieldset>
                    <div className="field-row" style={{ justifyContent: 'center' }}>
                    <form onSubmit={this.handleNicknameChange}>
                                <input
                                    type="text"
                                    // placeholder={this.state.placeholder}
                                    value={this.state.nickname}
                                    onChange={this.handleInputValueChange}
                                    size="40"
                                />
                                <button type="submit" onClick={this.handleNicknameChange}>수정</button>
                            </form> 
                            </div>
                        <p className="description">내 게임 기록</p>
                        <div className="field-row" style={{ justifyContent: 'center' }}>
                        <BootstrapTable data={this.state.myPlayLogs}
                        bordered={false}
                        headerStyle={{ 'fontStyle': 'black', 'borderBottom': 'black 0.05rem solid', 'marginBottom':'1rem', 'marginTop':'1rem', 'paddingBottom':'1rem' }}
                        containerStyle={{ 'borderBottom': 'black solid 0.05rem', 'paddingBottom':'1rem' }}
                        >
                            <TableHeaderColumn dataField='id' dataAlign='center' isKey={true} tdStyle={{ 'fontSize': '1rem',paddingRight:'2rem' }} thStyle={{ 'fontSize': '1rem',paddingLeft:'1rem' ,paddingRight:'3rem' }}>순위</TableHeaderColumn>
                            <TableHeaderColumn dataField='stagename' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight:'2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight:'3rem' }}>스테이지</TableHeaderColumn>
                            <TableHeaderColumn dataField='score' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight:'2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight:'3rem' }}>점수</TableHeaderColumn>                        
                        </BootstrapTable>
                        </div>
                        
                        <div className="field-row" style={{ justifyContent: 'center' }}>
                        <button 
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
