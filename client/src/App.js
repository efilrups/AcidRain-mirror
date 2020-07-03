import React, { Component } from 'react'
import { Nav, Login } from './pages'
import { Route } from 'react-router-dom'
class App extends Component {
  state = {
    userId: '',
    selectedStageName: 'test',
    stageContents: []
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
    const { userId, selectedStageName, stageContents } = this.state
    return (
      <div>
        <Route path='/' render={() => <Nav />} />
        <Route path='/' render={() => <Login userId={userId} selectedStageName={selectedStageName}
          stageContents={stageContents}  clickStage={this.clickStage} getContents={this.getContents} />} />
      </div>
    )
  }
}



export default App;
