import React from 'react'
import { useSelector } from 'react-redux';
import './TrendingBanner.css'
import ArticleTileOne from '../ArticleTileOne'
import stonks from '../../public/svgexport-3.svg';

const TrendingBanner = () => {

  const articles = useSelector(state=>  state.article.articles)

  console.log(articles.length);

  if(articles.length < 6){
    console.log('yes?');
    for(let i = 0; i < 7 - articles.length; i++){
      console.log('here?');
    articles.push({num:i, profileImage: 'profile-image.jpg', firstName: 'Nick', lastName: 'Wignall', title: 'Business Model Generation & Playing to Win', date: 'May 29', readTime: 8}) 
  }
}

console.log(articles.length);

  return (
    <div className='main-page-trending-banner-container'>

      <div className='trending-banner-header'>
        <div className='trending-image-container'>
          <img src={stonks} alt="Trending on medium" className="main-page-trending-image"/>
        </div>

        <div className='memo-text'> Trending on Medium </div>
      </div>



      <div className='main-page-trending-tile-container'>
        {articles.length === 6 && articles.map((article,i)=>(
          <ArticleTileOne key={i} article={article}/>
        ))}
      </div>
    </div>
  )
}

export default TrendingBanner
