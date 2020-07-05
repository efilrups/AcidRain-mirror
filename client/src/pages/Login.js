import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserLogin, GuestLogin, Signup } from '../components'
import { SelectStage } from './index'
import './css/Login.css'


class Login extends Component {
    

    render() {
        const { userId, selectedStageName, handleStageButton , clickStage, getContents, stageContents, changeGuest, changeUserId,wantToMake, handleMakingStage } = this.props;
        return (
            <div>
                <Switch>
                  <Route path='/login'><UserLogin changeGuest={changeGuest} changeUserId={changeUserId}></UserLogin></Route>
                  <Route path='/signup'><Signup></Signup></Route>
                  {/* <GuestLogin /> */}
                  
                </Switch>
                <Route path='/selectstage' render={() => <SelectStage selectedStageName={selectedStageName} clickStage={clickStage}
                   handleStageButton ={handleStageButton} getContents={getContents} stageContents={stageContents} 
                   wantToMake={wantToMake} handleMakingStage={handleMakingStage} userId={userId}
                   />} />

            </div>
        )
    }
}

export default Login
