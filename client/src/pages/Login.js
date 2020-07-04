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
        const { userId, selectedStageName, handleStageButton , clickStage, getContents } = this.props;
        return (
            <div>
                <UserLogin />
                <GuestLogin />
                <Signup />

                <Switch>
                <Route path='/selectstage' render={() => <SelectStage selectedStageName={selectedStageName} clickStage={clickStage}
                   handleStageButton ={handleStageButton} getContents={getContents} />} />
                   </Switch>
            </div>
        )
    }
}

export default Login
