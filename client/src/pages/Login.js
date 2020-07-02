import React, { Component } from 'react'
import { Switch, Route} from "react-router-dom";
import { UserLogin, GuestLogin, Signup } from '../components'
class Login extends Component {
    render() {
        return (
            <div>
               <Switch>
                <UserLogin/>
                <GuestLogin/>
                <Signup/>

                <Route path='/selectstage'></Route>
               </Switch> 
            </div>
        )
    }
}

export default Login

