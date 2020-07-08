import React, { Component } from 'react'
import { SketchPicker, ChromePicker } from 'react-color';
import './css/MakeThema.css'

class makeThema extends Component {
    constructor(props){
        super(props)
    }
    render() {
      const  { color, handleColorChange } = this.props
        return (
            <div className="colorPicker-box">
            <ChromePicker className="colorPicker" color={color} onChange={handleColorChange}/>
            </div>
        )
    }
}

export default makeThema
