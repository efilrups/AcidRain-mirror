import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserLogin, GuestLogin, Signup } from '../components'
import { SelectStage } from './index'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    render() {
        const { userId, selectedStageName, handleStageButton , clickStage, getContents, stageContents, wantToMake, handleMakingStage } = this.props;
        return (
            <div className='Login-page'>
                <UserLogin />
                <GuestLogin />
                <Signup />



                <Route path='/selectstage' render={() => <SelectStage selectedStageName={selectedStageName} clickStage={clickStage}
                   handleStageButton ={handleStageButton} getContents={getContents} stageContents={stageContents} 
                   wantToMake={wantToMake} handleMakingStage={handleMakingStage} userId={userId}
                   />} />

            </div>
        )
    }
}

export default Login
