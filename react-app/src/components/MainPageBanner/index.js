import React from 'react'
import './MainPageBanner.css'
import MmmComponent from '../MmmComponent';


const MainPageBanner = () => {
  return (
    <div className='main-page-banner-container'>
      <div className='stay-curious'>Stay curious.</div>
      <div className='discover-stories'>Discover stories, thinking, and expertise from writers on any topic.</div>
      <div className='start-reading button'>Start reading</div>

      <div className='mmm-container-container'>
        <MmmComponent/>
      </div>
    
    </div>
  )
}

export default MainPageBanner