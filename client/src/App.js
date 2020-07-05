import React, { Component } from 'react'
import { Nav, Login, PlayStage } from './pages'
import { Route } from 'react-router-dom'
import { Play } from './components'

class App extends Component {
  state = {
    userId: 'fakenickname',
    selectedStageName: 'test',
    stageContents: '',


    //login상태가 되면 이 값이 true로 변하고 그 값을 이용해 로그인 여부 판단.
    isLogin: false,
    //게스트가 로그인 했을 때, 회원이 로그인 했을 때로 나눠서 Nav의 마이페이지버튼 생성, 비생성 조절
    isGuest: true,
  }

  clickStage = (name) => {
    if (name !== this.state.selectedStageName) {
      this.setState({ selectedStageName: name })
    }
  }


  //스테이지 선택 버튼을 누르면 true로 값이 변하게
  handleStageButton = () => {
    this.setStage({ isSubmitedStage: true })
  }

  getContents = (clickedStage) => {
    this.setState({ stageContents: clickedStage })
  }

  //게임 끝나면 stageContents, selectedStageName은 test로, gamestart상태를 false로 변경
  handleGameEnd = () =>{
    this.setState({selectedStageName:'test', stageContents:''})
  }


  render() {
    const { userId, selectedStageName, stageContents } = this.state
    return (
      <div className='Appjs'>
        <Route path='/' render={() => <Nav userId={userId}  stageContents={stageContents} />} />
        <Route path='/' render={() => <Login userId={userId}
          stageContents={stageContents} clickStage={this.clickStage} getContents={this.getContents} selectedStageName={selectedStageName} />} />
        <Route path='/' render={() => <PlayStage userId={userId} selectedStageName={selectedStageName} stageContents={stageContents}
        handleGameEnd={this.handleGameEnd}
        />} />
      </div>
    )
  }
}



export default App;
