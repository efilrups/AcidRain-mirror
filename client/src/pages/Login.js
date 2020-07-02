import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import { UserLogin, GuestLogin, Signup } from '../components'
import { SelectStage, PlayStage } from './index'
class Login extends Component {
    render() {
        return (
            <div>
              Login
              <UserLogin/>
              <GuestLogin/>
              <Signup/>
              <Switch>
                <Route path='/selectstage' component={SelectStage}></Route>
                <Route path='/playstage' component={PlayStage}></Route>
               </Switch>
            </div>
        )
    }
}

export default Login
