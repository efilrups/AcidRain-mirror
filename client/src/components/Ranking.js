import React, { Component } from 'react';
import "98.css"
import "./css/Ranking.css"
// import Table from 'react-bootstrap/Table'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const axios = require('axios')


class Ranking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rankingOfTop10: [
                {
                    "id": 1,
                    "nickname": 'testname1',
                    "stageName": 'stage1',
                    "score": 1000,
                    "created_at": '2020-07-03'
                },
                {
                    "id": 2,
                    "nickname": 'testname2',
                    "stageName": 'stage1',
                    "score": 600,
                    "created_at": '2020-07-03'
                }
            ]
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/main/rank')
            .then(res => {
                console.log(res.data)
                this.setState({ rankingOfTop10: res.data })
            })
    }

    render() {
        return (

            <div className="window">
                <div class="title-bar">
                    <div class="title-bar-text">Acid rain</div>
                    <div class="title-bar-controls">
                    </div>
                </div>
                <div className="window-body">

                    <p className="title" style={{ textAlign: "center" }}>점수판</p>

                    <fieldset>
                        <BootstrapTable data={this.state.rankingOfTop10} bordered={false}>
                            <TableHeaderColumn dataField='id' headerAlign="center" dataAlign='center' isKey={true} thStyle={{ 'fontSize': '1rem' }}>순위</TableHeaderColumn>
                            <TableHeaderColumn dataField='nickname' headerAlign="center" dataAlign='center' thStyle={{ 'fontSize': '1rem' }}>이름</TableHeaderColumn>
                            <TableHeaderColumn dataField='stageName' headerAlign="center" dataAlign='center' thStyle={{ 'fontSize': '1rem' }}>스테이지</TableHeaderColumn>
                            <TableHeaderColumn dataField='score' headerAlign="center" dataAlign='center' thStyle={{ 'fontSize': '1rem' }} >점수</TableHeaderColumn>
                            <TableHeaderColumn dataField='created_at' headerAlign="center" dataAlign='center' thStyle={{ 'fontSize': '1rem' }} >일자</TableHeaderColumn>
                        </BootstrapTable>

                        <div className="field-row" style={{ justifyContent: 'center' }}>
                            <button onClick={() => {
                                this.props.history.push('/selectStage')
                            }}>스테이지 선택</button>
                        </div>
                    </fieldset>

                </div>
            </div>
        )
    }
}

export default Ranking

/*1. 시작하자마자 10개의 게임결과를 받아오기
2.화면에 보여주기
3. 스테이지 선택 누르면 selectstage로     이동
*/