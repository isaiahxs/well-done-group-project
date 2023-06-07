import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './StoryTileTwo.css';
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';
import { WindowContext } from '../../context/WindowContext';
import parse from 'html-react-parser';

const StoryTileTwo = ({ story, index }) => {
  const history = useHistory();
  const [date, setDate] = useState('Dec 25, 2560')
  const [readTime, setReadTime] = useState(4)
  const {windowSize} = useContext(WindowContext)
  const [thumbnail, setThumbnail] = useState('')
  const [storyContent, setStoryContent] = useState('')


  useEffect(()=>{
    if(story){
      let parsedContent = parse(story.content.slice(0,80) + '...')
      console.log('----THIS IS OUR PARSED CONTENT----', parsedContent)
      setStoryContent(parsedContent)
      let month = story?.createdAt.slice(8,11)
      let day = story?.createdAt.slice(5,7)
      setDate(`${month} ${day}`)
    }
    setReadTime(Math.floor(Math.random() * (20) + 4))
    setThumbnail(story.images[0])


  },[story])



  return (
    <div className="story-tile-style2">
      <div className="style2-content">
        <div className="style2-author-container">
          <div className="style2-profile-image">
            <img
              // src={story?.authorInfo.profileImage}
              src={mediumLogoCircles}
              alt="author profile picture"
            ></img>
          </div>
          <div 
          className="style2-author-name memo-text"
          onClick={() => history.push(`/author/${story.id}`)}>
            {story?.authorInfo.firstName} {story?.authorInfo.lastName}
          </div>
        </div>
        <div className="style2-story-title-container">
          <div className=" style2-story-title memo-text" onClick={() => history.push(`/story/${story.id}`)}>{story?.title}</div>
        </div>

        {windowSize > 699 && (<div className="style2-header-container flexbetween memo-text">
          <div className="style2-header-content">{storyContent}</div>
        </div>)}

        {/* story.content.slice(0,80) + '...' */}

        <div className="style2-date-read-time-container flexbetween memo-text">
          <div className="style2-date-content">{date}</div>
          <i className="style2 fa-solid fa-circle"></i>
          <div className="style2-date-read-time-content">
            {/* {story?.readTime} min read */}
            {readTime} min read
          </div>
        </div>
      </div>
      <div className='style2-story-image'>
        <img
          src={thumbnail.url}
          alt={thumbnail.altTag}
        ></img>
      </div>
    </div>
  );
};
export default StoryTileTwo;


