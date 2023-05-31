import React from 'react'
import './TrendingBanner.css'
import ArticleTileOne from '../ArticleTileOne'
import stonks from '../../public/svgexport-3.svg';

const TrendingBanner = () => {
  return (
    <div className='main-page-trending-banner-container'>

      <div className='trending-banner-header'>
        <div className='trending-image-container'>
          <img src={stonks} alt="Trending on medium" className="main-page-trending-image"/>
        </div>

        <div className='memo-text'> Trending on Medium </div>
      </div>



      <div className='main-page-trending-tile-container'>
        <ArticleTileOne/>
        <ArticleTileOne/>
        <ArticleTileOne/>
        <ArticleTileOne/>
        <ArticleTileOne/>
        <ArticleTileOne/>
      </div>
    </div>
  )
}

export default TrendingBanner
