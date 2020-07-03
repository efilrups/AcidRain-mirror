import React, { Component } from 'react'
import { MyPage, Ranking } from '../components'

class Nav extends Component {
    render() {
        return (
            <div>
            Nav Route 확인용
                <MyPage/>
                <Ranking/>
            </div>
        )
    }
}

export default Nav
