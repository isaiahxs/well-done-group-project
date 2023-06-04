import React from 'react'
import './StoryTileOne.css'

const StoryTileOne = ({story}) => {


  console.log(story);

console.log(story.firstName);

  return (
    <div className='story-tile-style1'>
      <div className='style1-number memo-text'>0{story.num}</div>


      <div className='style1-content'>
      
        <div className='style1-author-container flexbetween'>
          <div className='style1-profile-pic'>{story.profileImage}</div>
          <div className='style1-author-name memo-text'>{story.firstName}{' '}{story.lastName}</div>
        </div>
        <div className='style1-story-title-container'>
          <div className=' style1-story-title memo-text'>{story.title}</div>
        </div>
      
        <div className='style1-date-read-time-container flexbetween memo-text'>
          <div className='style1-date-content'>{story.date}</div>
          <i className="style1 fa-solid fa-circle"></i>
          <div className='style1-date-read-time-content'>{story.readTime} min read</div>
        </div>
      </div>
    </div>
  )
}
export default StoryTileOne