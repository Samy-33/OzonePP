import React from 'react'
import ReactLoading from 'react-loading'
import './style.css'

export const Throbber = ({type, color, text}) => {
  return (
    <div className="throbber">
      <ReactLoading type={type} color={color}/>
      {text}
    </div>
  )
}
