import React from 'react'
import './MainPageBanner.css'
import MmmComponent from '../MmmComponent';


const MainPageBanner = () => {
  return (
    <div className='main-page-banner-container'>
      <div className='content-container'>
        <div className='stay-curious header-text'>Stay curious.</div>
        <div className='discover-stories memo-text'>Discover stories, thinking, and expertise from writers on any topic.</div>
        <div className='start-reading button memo-text'>Start reading</div>
      </div>
      <div className='mmm-container-container'>
        <MmmComponent/>
      </div>
    
    </div>
  )
}

export default MainPageBanner