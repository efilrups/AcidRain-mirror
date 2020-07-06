import React, { Component } from 'react'
import { Nav, Login, PlayStage } from './pages'
import { Route } from 'react-router-dom'
import { Play, Mypage } from './components'
import cookie from 'react-cookies'
const axios = require('axios');

class App extends Component {
  state = {
    userId: '',
    selectedStageName: 'test',
    stageContents: '',
    gameLevel: 0,

    //login상태가 되면 이 값이 true로 변하고 그 값을 이용해 로그인 여부 판단.
    isLogin: false,
    //게스트가 로그인 했을 때, 회원이 로그인 했을 때로 나눠서 Nav의 마이페이지버튼 생성, 비생성 조절

    isGuest: false,
    //makeStage컴포넌트의 노출 여부를 해당 state로 관리
    wantToMake:false,
  }

  // 로그인 유지
  async componentDidMount(){
    let result = await axios.post('http://localhost:5000/main/login', {
      'session': cookie.load('sessionKey')
    })
    this.setState({isLogin: true, userId: result.data})
  }
  // 로그아웃
  logout = () => {
    this.setState({ isLogin: false, userId: '' })
    cookie.remove('sessionKey')
    console.log('this.state: ', this.state.userId);
  }

  clickStage = (name) => {
    if (name !== this.state.selectedStageName) {
      this.setState({ selectedStageName: name })
    }
  }
  // 유저의 로그인
  changeUserId = (user) => {
    this.setState({ userId: user, isLogin: true})
  }
  // 게스트의 로그인
  changeGuest = (guest) => {
    this.setState({ userId: guest, isGuest: true, isLogin: true})
  }



  //스테이지 선택 버튼을 누르면 true로 값이 변하게
  handleStageButton = () => {
    this.setStage({ isSubmitedStage: true })
  }

  getContents = (clickedStage, selectedLevel) => {
    this.setState({
        stageContents: clickedStage,
        gameLevel: selectedLevel
     })
  }

  //게임 끝나면 stageContents, selectedStageName은 test로, gamestart상태를 false로 변경
  handleGameEnd = () =>{
    this.setState({selectedStageName:'test', stageContents:''})
  }

  handleMakingStage = () => {
    this.setState({ wantToMake : !this.state.wantToMake})
  }

  render() {
    const { userId, isGuest, selectedStageName, stageContents, wantToMake, isLogin, gameLevel } = this.state
    return (
      <div className='app'>
        <Route path='/' render={() => <Nav
          userId={userId}
          isGuest={isGuest}
          changeUserId={this.changeUserId}
          isLogin={isLogin}
          logout={this.logout}
        />} />

        <Route path='/' render={() => <Login
          userId={userId}
          isLogin={isLogin}
          logout={this.logout}
          changeUserId={this.changeUserId}
          changeGuest={this.changeGuest}
          stageContents={stageContents}
          clickStage={this.clickStage}
          getContents={this.getContents}
          selectedStageName={selectedStageName}
          wantToMake={wantToMake}
          handleMakingStage={this.handleMakingStage}
        />} />

        <Route path='/' render={() => <PlayStage
          userId={userId}
          selectedStageName={selectedStageName}
          stageContents={stageContents}
          handleGameEnd={this.handleGameEnd}
          gameLevel={gameLevel}

        />} />

      </div>
    )
  }
}



export default App;
