import React, { Component } from 'react'
import { myPage, ranking } from '../components'

export class nav extends Component {
    render() {
        return (
            <div>
                <myPage/>
                <ranking/>
            </div>
        )
    }
}

export default nav
