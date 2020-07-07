import React, { Component } from 'react'
import { MyPage, Ranking, MakeThema } from '../components'
import { Route, Link, withRouter } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import './css/Nav.css'
class Nav extends Component {
    constructor(props){
        super(props)
    }
    navLogout = async() =>{
      console.log('logoutNav')
      await this.props.logout()
    }

    render() {

      const { userId, isGuest, isLogin, changeUserId,  themaPageIsOpen, handleThemaPage, color, handleColorChange, logout, socialLogin } =  this.props
      console.log('isGuest: ', isGuest);
        return (
            <div className="Nav-square" >
                <div className="Nav-link">
                <Route path="/mypage" render={()=><MyPage changeUserId={changeUserId} userId={userId}/>}/>
                    <div className="Nav-userId" 
                    // onClick={()=>{ 
                    //   this.props.history.push('/')}}
                      >
                      {
                        userId
                        ? `${userId}님이 입장하셨습니다.`
                        : `로그인 후에 이용해주세요.`
                      }
                    </div>
                    <Link to='/ranking' className="Link-ranking">랭킹</Link>
                    {
                      userId
                      ? socialLogin
                        ? <GoogleLogout
                            clientId="1037438704815-ih3s6v1brfb4p5oksifqvd881ss953kd.apps.googleusercontent.com"
                            render={renderProps => (
                              <div className="social-login" id="socialLogin" onClick={renderProps.onClick} 
                              disabled={renderProps.disabled}>로그아웃</div>
                            )}
                            buttonText="Logout"
                            onLogoutSuccess={this.navLogout}
                          ></GoogleLogout>
                        : <Link to='/login' className="Link-login" onClick={logout}>로그아웃</Link>
                      : <Link to='/login' className="Link-login">로그인</Link>
                    }
                    {
                      userId
                      ? isGuest
                        ? null 
                        : <Link to='/mypage' className="Link-mypage">마이페이지</Link>
                      : null
                    }
                    <span className="Link-makeThema" onClick={handleThemaPage}>배경색</span>
                   { themaPageIsOpen ?  
                   <div className="makeThema-box">
                   <MakeThema themaPageIsOpen={themaPageIsOpen} handleThemaPage={handleThemaPage} color={color} handleColorChange={handleColorChange} /> 
                   </div>
                   : '' }
                    <Route path="/ranking" render={()=><Ranking isLogin={isLogin} />}/>
                </div>

            </div>
        )
    }
}
// handleOpenModal
export default withRouter(Nav)
