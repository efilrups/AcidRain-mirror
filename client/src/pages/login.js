import React, { Component } from 'react'
import { Switch, Route} from "react-router-dom";
import { userLogin, guestLogin, signup } from '../components'
export class login extends Component {
    render() {
        return (
            <div>
               <Switch>
                <userLogin/>
                <guestLogin/>
                <signup/>

                <Route path='/selectstage'></Route>
               </Switch> 
            </div>
        )
    }
}

export default login

