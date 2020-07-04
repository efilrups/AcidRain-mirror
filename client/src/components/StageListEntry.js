import React from 'react'
import './css/StageListEntry.css'


function StageListEntry(props) {
    const { stageName, clickStage , isSelected } = props
   
  
    // console.log(`stageName is ${stageName} ${isSelected}`)
    let bgColor = isSelected ? "blue" : "white"
    let fontColor = isSelected ? "white" : "black"

    return (
        
        <li onClick={()=>clickStage(stageName)} style={{backgroundColor: bgColor, color:fontColor}} >
            <div >{stageName}</div>
        </li>
    )
}

export default StageListEntry


