import React, { Component } from 'react'
import { MyPage, Ranking } from '../components'
import { Route, Link } from 'react-router-dom';
import './css/Nav.css'
class Nav extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const { userId } =  this.props
        return (
            <div className="Nav-square">
            <div className="Nav-link">
            
             <Link to='/mypage' className="Link-mypage">마이페이지</Link>
             <Route path="/mypage" render={()=><MyPage userId={userId}/>}/>

             <div className="Nav-userId">{ userId ? `${userId}님 산성비에 입장하셨습니다.` : `로그인 후에 이용해주세요.`}</div>
          

                <Link to='/ranking' className="Link-ranking">랭킹</Link>
                <Route path="/ranking" render={()=><Ranking />}/>
                </div>
            </div>
        )
    }
}
// handleOpenModal
export default Nav
