import React, { Component } from 'react'
import {Route} from "react-router-dom";
import { UserLogin, GuestLogin, Signup } from '../components'
import { SelectStage } from '../pages'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {

        }

    }
    
    render() {
        const { selectedStageName, clickStage,  getContent } = this.props;
        return (
            <div>
            Login Route 확인용
                <UserLogin/>
                <GuestLogin/>
                <Signup/>

                <Route path='/selectstage' render={() => <SelectStage selectedStageName={selectedStageName} clickStage={clickStage}  getContent={getContent}/>}/>
           
            </div>
        )
    }
}

export default Login
