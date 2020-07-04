import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import "98.css"
import "./css/Ranking.css"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const axios = require('axios')


class Ranking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rankingOfTop10: [

            ]
        }
    }

    //rank링크로 이동하면 db에 저장된 playlog를 받아온다.
    async componentDidMount() {
        await axios.get('http://localhost:5000/main/rank')
            .then(res => {
                console.log(res.data)
                this.setState({ rankingOfTop10: res.data })
            })
    }

    render() {
        //react-bootstrap-table을 이용하여 table을 구현, data를 지정하고 키 값을 지정하면 저절로 표를 구현할 수 있음 
        return (

            <div className="window Ranking-window">

                <div className="window-body">

                    <div class="title-bar-controls">
                        <button className="closeButton" aria-label="Close" onClick={()=>{
                            this.props.history.goBack()
                        }}></button>
                    </div>

                    <p className="title" style={{ textAlign: "center" }}>점수판</p>


                    <fieldset className='ranking-fieldset'>
                        <div className="field-row" style={{ justifyContent: 'center' }}>
                            <BootstrapTable data={this.state.rankingOfTop10}
                                bordered={false}
                                headerStyle={{ 'borderBottom': 'black 0.05rem solid', 'marginBottom': '1rem', 'marginTop': '1rem', 'paddingBottom': '1rem' }}
                                containerStyle={{ 'borderBottom': 'black solid 0.05rem', 'paddingBottom': '1rem' }}
                            // tableStyle={ { 'border': 'blue solid 1px'  } }
                            >
                                <TableHeaderColumn dataField='rank' dataAlign='center' isKey={true} tdStyle={{ 'fontSize': '1rem', paddingRight: '2rem' }} thStyle={{ 'fontSize': '1rem', paddingLeft: '1rem', paddingRight: '2rem' }}>순위</TableHeaderColumn>
                                <TableHeaderColumn dataField='nickname' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight: '2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight: '3rem' }}>이름</TableHeaderColumn>
                                <TableHeaderColumn dataField='stagename' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight: '2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight: '1rem' }}>스테이지</TableHeaderColumn>
                                <TableHeaderColumn dataField='score' dataAlign='center' tdStyle={{ 'fontSize': '1rem', paddingRight: '2rem' }} thStyle={{ 'fontSize': '1rem', paddingRight: '4rem' }} >점수</TableHeaderColumn>
                                <TableHeaderColumn dataField='createdAt' dataAlign='center' tdStyle={{ 'fontSize': '1rem' }} thStyle={{ 'fontSize': '1rem' }} >일자</TableHeaderColumn>
                            </BootstrapTable>
                        </div>

                        <div className="field-row" style={{ justifyContent: 'center' }}>
                            <button onClick={() => {
                                //스테이지 선택 버튼을 누르면 스테이지 선택 페이지로 이동
                                this.props.history.push('/selectStage')
                            }}>스테이지 선택</button>
                        </div>
                    </fieldset>

                </div>
            </div>
        )
    }
}

export default withRouter(Ranking)

