import React, { Component } from 'react'
import { Nav, Login } from './pages'
import { Route } from 'react-router-dom'
class App extends Component {
  state = {
    userId: '',
    selectedStageName: 'test',
    stageContents: [],
    missedCode: [],
    score: '',
  }

  clickStage = (name) => {
    if (name !== this.state.selectedStageName) {
      this.setState({ selectedStageName: name })
    }
  }

  getContents = (clickedStage) => {
    this.setState({ stageContents: clickedStage })
  }


  render() {
    const { userId, selectedStageName, stageContents, missedCode, score } = this.state
    return (
      <div>
        <Route path='/' render={() => <Nav />} />
        <Route path='/' render={() => <Login userId={userId} selectedStageName={selectedStageName}
          stageContents={stageContents} missedCode={missedCode} score={score}
          clickStage={this.clickStage} getContents={this.getContents} />} />
      </div>
    )
  }
}



export default App;
