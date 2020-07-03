import React, { Component } from 'react'
import { Nav, Login } from './pages'
import { Route } from 'react-router-dom'
class App extends Component {
  state = {
    //제일 첫번째 stage이름을 넣어줌 
    selectedStageName : 'stage1',
    stageContents : [],
  }

  clickStage = (name) => {
    if(name !== this.state.selectedStageName ){
      this.setState({selectedStageName :name})
    }
  }

  getContents = (clickedStage) => {
    this.setState({stageContents:clickedStage})
  } 


  render() {
    const { selectedStageName } = this.state
    return (
      <div>
       <Route path='/' render={()=><Nav/>} />
       <Route path='/' render={()=><Login selectedStageName={selectedStageName} clickStage ={this.clickStage} getContents={this.getContents} />} />
      </div> 
    )
  }
}



export default App;
