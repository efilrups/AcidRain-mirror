import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './css/StageListEntry.css'
const axios = require('axios');

class  StageListEntry extends Component {
  constructor(props){
    super(props)
  }







render() {

    const { createdBy, stageName, clickStage, isSelected, selectedStageName, userId, resetEditingHope } = this.props
    // console.log(`stageName is ${stageName} ${isSelected}`)


    let bgColor = isSelected ? "navy" : "white"
    let fontColor = isSelected ? "white" : "black"

    // console.log(`selectedStageName is ${selectedStageName} stageName is ${stageName}`)
    // console.log(`cursor is ${this.props.cursor} index is ${this.props.index}`)
    return (

        <tr className="selectingArea"
         onClick={() => clickStage(stageName)} style={{ backgroundColor: bgColor, color: fontColor }}

         >

                <td className="td-text">{stageName}</td>
                <td className="td-text">{createdBy}</td>

            <td className="far fa-plus-square fa-lg" onClick={() => {
                //플러스 버튼 누르면 selectedStageName에 해당하는 db의 컨텐츠를 가져오기
                this.props.handleEditStageName(stageName)
                axios.post("http://localhost:5000/main/confirm", {
                  userid: userId,
                  stagename: stageName
                })
                    .then(res => {
                      console.log(res.data)
                        //해당 스테이지에 해당하는 컨텐츠를 담고 selectStage에 담아주기
                        this.props.handleEditStageContents(JSON.parse(res.data[0].contents))
                        //만들기 모달로 이동
                        this.props.handleMakingStage()
                        this.props.updateStage(stageName)
                    })
                    .catch(err => {
                      console.log(err)
                      alert('권한이 없습니다')
                    })

            }}></td>
            <td className="far fa-minus-square fa-lg" onClick={ async () => {
                //마이너스 버튼 누르면 selectedStageName에 해당하는 db의 컨텐츠를 삭제 요청
               ( window.confirm("정말 삭제하시겠습니까?")===true ) ?
                  await axios.post('http://localhost:5000/main/confirm', {
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
                : console.log('삭제할맘없대')
                resetEditingHope();
            }}></td>
        </tr>

    )
          }
}

export default withRouter(StageListEntry)
