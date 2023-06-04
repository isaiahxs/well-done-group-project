import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './StoryTileOne.css'
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';

const StoryTileOne = ({story, index}) => {

  const history = useHistory()


const handleNav = () =>{}





  return (




    <div className='story-tile-style1' onClick={()=>history.push(`/story/${story.id}`)}>
      <div className='style1-number memo-text'>0{index+1}</div>

      <div className='style1-content'>
      
        <div className='style1-author-container flexbetween'>
          <div className='style1-profile-pic'>
            <img src={story?.authorInfo.profileImage} alt='author profile picture'></img>
          </div>
          <div className='style1-author-name memo-text'>{story?.authorInfo.firstName}{' '}{story?.authorInfo.lastName}</div>
        </div>
        <div className='style1-story-title-container'>
          <div className=' style1-story-title memo-text'>{story?.title}</div>
        </div>
      
        <div className='style1-date-read-time-container flexbetween memo-text'>
          <div className='style1-date-content'>{story?.createdAt}</div>
          <i className="style1 fa-solid fa-circle"></i>
          <div className='style1-date-read-time-content'>{story?.readTime} min read</div>
        </div>
      </div>
    </div>

  )
}
export default StoryTileOne