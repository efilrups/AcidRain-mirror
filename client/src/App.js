import React, { Component } from 'react'
import { Nav, Login, PlayStage } from './pages'
import { Route, Redirect } from 'react-router-dom'
import { Play, Mypage } from './components'
import cookie from 'react-cookies'
const axios = require('axios');

class App extends Component {
  state = {
    userId: '',
    //db에 저장된 제일 첫번째 스테이지를 보여줘서 첫리스트가 선택된 상태로 보여지도록 
    selectedStageName: 'test',
    stageContents: '',
    color: "#848484",
    gameLevel: 0,
    //login상태가 되면 이 값이 true로 변하고 그 값을 이용해 로그인 여부 판단.
    isLogin: false,
    //게스트가 로그인 했을 때, 회원이 로그인 했을 때로 나눠서 Nav의 마이페이지버튼 생성, 비생성 조절
    isGuest: false,
    //makeStage컴포넌트의 노출 여부를 해당 state로 관리 
    wantToMake: false,
    themaPageIsOpen: false,
    socialLogin: true
  }

  // 로그인 유지
  async componentDidMount() {
    let result = await axios.post('http://localhost:5000/main/login', {
      'session': cookie.load('sessionKey')
    })
    console.log('result: ', result);
    this.setState({ isLogin: true, userId: result.data })
  }
  // 로그아웃
  logout = async () => {
    console.log('logout')
    await this.setState({ userId: '', isLogin: false, isGuest: false, socialLogin: false })
    cookie.remove('sessionKey')
    console.log('this.state: ', this.state.userId);
  }


  handleColorChange = color => {
    this.setState({ color: color.hex });
  };


  clickStage = (name) => {
    if (name !== this.state.selectedStageName) {
      this.setState({ selectedStageName: name })
    }
  }
  // 유저의 로그인
  changeUserId = (user) => {
    this.setState({ userId: user, isLogin: true })
  }
  // 게스트의 로그인
  changeGuest = (guest) => {
    this.setState({ userId: guest, isGuest: true })
  }



  //스테이지 선택 버튼을 누르면 true로 값이 변하게
  handleStageButton = () => {
    this.setStage({ isSubmitedStage: true })
  }

  getContents = (clickedStage) => {
    this.setState({ stageContents: clickedStage })
  }

  //게임 끝나면 stageContents, selectedStageName은 test로, gamestart상태를 false로 변경
  handleGameEnd = () => {
    this.setState({ selectedStageName: 'test', stageContents: '' })
  }

  handleMakingStage = () => {
    this.setState({ wantToMake: !this.state.wantToMake })
  }

  handleColorChange = color => {
    this.setState({ color: color.hex });
  };

  handleThemaPage = () => {
    this.setState({ themaPageIsOpen: !this.state.themaPageIsOpen })
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  render() {
    const { userId, isGuest, selectedStageName, stageContents, wantToMake, isLogin, themaPageIsOpen, color, gameLevel, socialLogin } = this.state
    return (
      <div className='app' style={{ backgroundColor: this.state.color }}>
        
        <Nav userId={userId}
          isGuest={isGuest}
          isLogin={isLogin}
          changeUserId={this.changeUserId}
          themaPageIsOpen={themaPageIsOpen}
          handleThemaPage={this.handleThemaPage}
          color={color}
          handleColorChange={this.handleColorChange}
          logout={this.logout}
          socialLogin={socialLogin}
        />
        <Login
          userId={userId}
          isGuest={isGuest}
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
          socialLogin={socialLogin}
        />

        <Route
          path='/'
          render={() => {
            if (!isLogin) {
              return <Redirect to='/login' />
            }
            return <Redirect to='/selectstage' />
          }}
        />



        <PlayStage userId={userId}
          selectedStageName={selectedStageName}
          stageContents={stageContents}
          handleGameEnd={this.handleGameEnd}
          color={color}
          gameLevel={gameLevel}
        />
      </div>
    )
  }
}



export default App;
