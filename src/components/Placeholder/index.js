import React from 'react'
import './style.css'

export default function Placeholder() {
  return (
    <li className="timeline-item">
      <div className="animated-background">
        <div className="background-masker header-top"></div>
        <div className="background-masker header-left"></div>
        <div className="background-masker header-right"></div>
        <div className="background-masker header-bottom"></div>
        <div className="background-masker subheader-left"></div>
        <div className="background-masker subheader-right"></div>
        <div className="background-masker subheader-bottom"></div>
      </div>
    </li>
  )
}
