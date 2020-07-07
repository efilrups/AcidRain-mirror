import React from 'react'
import { withRouter } from 'react-router-dom'
import './css/StageListEntry.css'
const axios = require('axios');

function StageListEntry(props) {
    const { createdBy, stageName, clickStage, isSelected, selectedStageName, userId, refresh } = props
    console.log('userId: ', userId);


    // console.log(`stageName is ${stageName} ${isSelected}`)
    let bgColor = isSelected ? "navy" : "white"
    let fontColor = isSelected ? "white" : "black"

    return (
      
        <tr className="selectingArea"
         onClick={() => clickStage(stageName)} style={{ backgroundColor: bgColor, color: fontColor }}
         >
            
                <td className="td-text">{stageName}</td>
                <td className="td-text">{createdBy}</td>
                
            <td className="far fa-plus-square fa-lg" onClick={() => {
                //플러스 버튼 누르면 selectedStageName에 해당하는 db의 컨텐츠를 가져오기 
                props.handleEditStageName(stageName)
                axios.post("http://localhost:5000/main/playstage", {
                  userid: userId,
                  stagename: stageName
                })
                    .then(res => {
                        //해당 스테이지에 해당하는 컨텐츠를 담고 selectStage에 담아주기
                        props.handleEditStageContents(JSON.parse(res.data[0].contents))
                        //만들기 모달로 이동
                        props.handleMakingStage()
                    })
                    .catch(err => {
                      console.log(err)
                      alert('권한이 없습니다')
                    })

            }}></td>
            <td className="far fa-minus-square fa-lg" onClick={() => {
                //마이너스 버튼 누르면 selectedStageName에 해당하는 db의 컨텐츠를 삭제 요청
                  axios.post('http://localhost:5000/main/playstage', {
                    delete: true,
                    userid: userId,
                    stagename: stageName
                  })
                  .then(res => {
                    console.log(res)
                    alert('제거되었습니다')
                  })
                  .catch(err => {
                    console.log(err)
                    alert('권한이 없습니다')
                  })
                  
            }}></td>
        </tr>

    )
}

export default withRouter(StageListEntry)


