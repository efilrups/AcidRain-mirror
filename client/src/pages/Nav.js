import React, { Component } from 'react'
import { MyPage, Ranking } from '../components'
import { Route, Link } from 'react-router-dom';
class Nav extends Component {
    render() {
        return (
            <div>
            Nav Route 확인용
                <MyPage/>
                <Link to='/ranking'>랭킹</Link>
                <Route path="/ranking" component={Ranking}></Route>
            </div>
        )
    }
}

export default Nav
