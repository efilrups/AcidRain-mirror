import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserLogin, GuestLogin, Signup } from '../components'
import { SelectStage,PlayStage } from './index'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {

        }

    }

    render() {
        const { userId, selectedStageName, stageContents, missedCode, score, clickStage,  getContent } = this.props;
        return (
            <div>
            Login Route 확인용
                <UserLogin/>
                <GuestLogin/>
                <Signup/>

                <Switch>
                <Route path='/playstage' render={()=><PlayStage userId={userId} selectedStageName={selectedStageName} 
                    stageContents={stageContents} missedCode={missedCode} score={score} 
                />}/>
                <Route path='/selectstage' render={() => <SelectStage selectedStageName={selectedStageName} clickStage={clickStage}  getContent={getContent}/>}/>
                </Switch>
            </div>
        )
    }
}

export default Login
