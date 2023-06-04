<<<<<<< HEAD
import { React, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TrendingBanner.css'
import StoryTileOne from '../StoryTileOne'
import stonks from '../../public/svgexport-3.svg';
import * as storyActions from '../../store/story';
=======
import React from 'react'
import { useSelector } from 'react-redux';
import './TrendingBanner.css'
import StoryTileOne from '../StoryTileOne'
import stonks from '../../public/svgexport-3.svg';
>>>>>>> e4e179324cba937fcaf8ab8614c78a73546b02af

const TrendingBanner = () => {

  const stories = useSelector( state =>  state.story.stories)
<<<<<<< HEAD
  const dispatch = useDispatch();
  const [loaded, isLoaded] = useState(false);
=======
>>>>>>> e4e179324cba937fcaf8ab8614c78a73546b02af

  console.log(stories.length);

  if(!stories || stories.length < 6){
    console.log('yes?');
    for(let i = 0; i < 7 - stories.length; i++){
      console.log('here?');
    stories.push({num:i, profileImage: 'profile-image.jpg', firstName: 'Nick', lastName: 'Wignall', title: 'Business Model Generation & Playing to Win', date: 'May 29', readTime: 8}) 
  }
}

<<<<<<< HEAD
useEffect(() => {
	console.log('we in here!');

  isLoaded(false);

  dispatch(storyActions.getStories())
  .then(() => {
    isLoaded(true);
  })

}, []);
=======
>>>>>>> e4e179324cba937fcaf8ab8614c78a73546b02af


  return (
    <div className='main-page-trending-banner-container'>

      <div className='trending-banner-header'>
        <div className='trending-image-container'>
          <img src={stonks} alt="Trending on medium" className="main-page-trending-image"/>
        </div>

        <div className='memo-text'> Trending on Medium </div>
      </div>



      <div className='main-page-trending-tile-container'>
        {stories.length === 6 && stories.map((story,i)=>(
          <StoryTileOne key={i} story={story}/>
        ))}
      </div>
    </div>
  )
}

export default TrendingBanner
