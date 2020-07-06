import React from 'react'
import { withRouter } from 'react-router-dom'
import './css/StageListEntry.css'
const axios = require('axios');

function StageListEntry(props) {
    const { createdBy, stageName, clickStage, isSelected, selectedStageName } = props


    // console.log(`stageName is ${stageName} ${isSelected}`)
    let bgColor = isSelected ? "blue" : "white"
    let fontColor = isSelected ? "white" : "black"

    return (

        <div className="selectingArea" onClick={() => clickStage(stageName)} style={{ backgroundColor: bgColor, color: fontColor }}>
            <tr>
                <th scope="row" className="StageListEntry-stagename">{stageName}</th>
                <td className="StageListEntry-createdBy">{createdBy}</td>
            </tr>
            <div className="far fa-plus-square fa-lg" onClick={() => {
                //플러스 버튼 누르면 selectedStageName에 해당하는 db의 컨텐츠를 가져오기 
                props.handleEditStageName(stageName)
                axios.post("http://localhost:5000/main/playstage", {
                    stagename: stageName
                })
                    .then(res => {
                        //해당 스테이지에 해당하는 컨텐츠를 담고 selectStage에 담아주기
                        props.handleEditStageContents(JSON.parse(res.data[0].contents))

                        //만들기 모달로 이동
                        props.handleMakingStage()
                        
                    })

            }}></div>
            <div className="far fa-minus-square fa-lg" onClick={() => {
                //마이너스 버튼 누르면 selectedStageName에 해당하는 db의 컨텐츠를 삭제 요청 
                axios.post('http://localhost:5000/main/selectstage', {
                    stagename: selectedStageName
                })
            }}></div>
        </div>
    )
}

export default withRouter(StageListEntry)


