import React, { Component } from 'react'
import { MyPage, Ranking } from '../components'

class Nav extends Component {
    render() {
        return (
            <div>
                <MyPage/>
                <Ranking/>
            </div>
        )
    }
}

export default Nav
