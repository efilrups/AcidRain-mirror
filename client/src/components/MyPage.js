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
            value: ""
            
        }
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
    }

    handleNicknameChange(e){
        console.log(this.props.userId)

        axios.post('http://localhost:5000/main/mypage', {
            //// 기존 유저정보의 닉네임 (this.state에서 가지고 오기)
            nickname: this.props.userId,
            // 인풋 밸류로 수정할 닉네임을 받아주기
            newnickname: this.state.value
        })
        .then(res => alert(res.json()))
        // * 바꾼 닉네임을 Nav 에 표현해주어야 한다. newnickname: this.state.value을 Nav userid로 바꾸기 
        // * state 끌어올리기를 해줘야 한다.
        // * MyPage > Nav > App으로 끌어올리기
        // .then(res => {
        //     alert('asdf')
        // })
        
        // this.setState({
        //     placeholder: "수정할 닉네임을 입력하세요",
        //     value: ""
        // }, () => alert('닉네임이 수정되었습니다.'))
        
        // 여기서 수정하고 나서 placeholder를 "수정할 닉네임을 입력하세요"로 다시 바꿔주기
    }

    handleInputValueChange(e){
        this.setState({
            value: e.target.value
        })
        console.log(this.state.value)
    }

    async componentDidMount() {
        console.log('mount 성공')
        await axios.get('http://localhost:5000/main/mypage')
        //여기서 해야하는게 보내준 닉네임에 따른 정보만 가지고 오기
            // .then(res => {
            //     let myPlayLogs = {}
            //     // 여기서 res를 콘솔에 찍어보고 수정하고 싶은데
            //     console.log(res.body)
            //     for (let playlogKey of res.body) {
            //         if ('stagename' in playlogKey) {
            //             myPlayLogs.stagename = playlogKey['stagename'];
            //         } else if ('score' in playlogKey) {
            //             myPlayLogs.score = playlogKey['score'];
            //         } else if ('missedcode' in playlogKey) {
            //             myPlayLogs.missedcode = playlogKey['missedcode']
            //         }
            //     }
            //     this.setState({
            //         myPlayLogs
            //     })
            // })
    }
    // * nickname 입력 칸 + 수정 버튼
    // * myPlayLogs 출력 (stage, score, missedcode)
    //// 게임하기를 누르면 selectStage 로 이동
    // * 닉네임 변경하면 알림 띄우기 (닉네임이 수정되었습니다.)
    // * 순위를 가져올 수 있나?
    // * 로그인 된 user 정보를 받아오는 방법
    // * CSS 위치 수정
    //// 렌더가 왜 두번되지ㅠㅠ엉엉 (App.js에 추가하면 그렇다)

    render() {
        return (
            <div>
                <div>
                        <div className="mypageTitle">마이페이지</div>
                        <div><br></br><br></br><br></br></div>
                        <div className="nickname">
                            <form onSubmit={this.handleNicknameChange}>
                                <input
                                    type="text"
                                    placeholder={this.state.placeholder}
                                    value={this.state.value}
                                    onChange={this.handleInputValueChange}
                                    size="40"
                                />
                                <button type="submit">수정</button>
                            </form> 
                        </div>

                        <div className="myplayLog">내 게임 기록
                        <BootstrapTable data={this.state.myPlayLogs}
                        bordered={false}
                        headerStyle={{ 'fontStyle': 'black', 'borderBottom': 'black 0.05rem solid', 'marginBottom':'1rem', 'marginTop':'1rem', 'paddingBottom':'1rem' }}
                        containerStyle={{ 'borderBottom': 'black solid 0.05rem', 'paddingBottom':'1rem' }}
                        >
                            <TableHeaderColumn dataField='id' dataAlign='center' isKey={true} tdStyle={{ 'fontSize': '1rem',paddingRight:'2rem' }} thStyle={{ 'fontSize': '1rem',paddingLeft:'1rem' ,paddingRight:'3rem' }}>순위</TableHeaderColumn>
                            <TableHeaderColumn dataField='stagename' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight:'2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight:'3rem' }}>스테이지</TableHeaderColumn>
                            <TableHeaderColumn dataField='score' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight:'2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight:'3rem' }}>점수</TableHeaderColumn>
                            <TableHeaderColumn dataField='missedcode' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight:'2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight:'3rem' }}>놓친 코드</TableHeaderColumn>
                            
                        </BootstrapTable>
                        </div>
                        
                        <button 
                        onClick={() => this.props.history.push("/selectStage")}
                        >게임하러 가기</button>
                </div>
            </div>
        )
    }
}

export default withRouter(MyPage)
