import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './StoryTileOne.css';
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';
import { WindowContext } from '../../context/WindowContext';
const StoryTileOne = ({ story, index }) => {
  const history = useHistory();
  const [date, setDate] = useState('Dec 25, 2560')
  const [readTime, setReadTime] = useState(4)
  const {windowSize} = useContext(WindowContext)
  const isMobileView = windowSize <= 900;


  useEffect(()=>{
    if(story){
      setDate(story?.createdAt.slice(0,16))
    }
    setReadTime(Math.floor(Math.random() * (20) + 4))
  },[story])


  return (
    <>
      {isMobileView && (
        <div className="story-tile-style1">
          <div className="style1-number memo-text">0{index + 1}</div>

          <div className="style1-content">
            <div className="style1-author-container">
              <div className="style1-profile-image">
                <img
                  // src={story?.authorInfo.profileImage}
                  src={mediumLogoCircles}
                  alt="author profile picture"
                ></img>
              </div>
              <div
                className="style1-author-name memo-text"
                onClick={() => history.push(`/author/${story.id}`)}
              >
                {story?.authorInfo.firstName} {story?.authorInfo.lastName}
              </div>
            </div>
            <div className="style1-story-title-container">
              <div
                className=" style1-story-title memo-text"
                onClick={() => history.push(`/story/${story.id}`)}
              >
                {story?.title}
              </div>
            </div>

            <div className="style1-date-read-time-container flexbetween memo-text">
              <div className="style1-date-content">{date}</div>
              <i className="style1 fa-solid fa-circle"></i>
              <div className="style1-date-read-time-content">
                {/* {story?.readTime} min read */}
                {readTime} min read
              </div>
            </div>
          </div>
        </div>
      )}

      {!isMobileView && (
        <div className="story-tile-style1">
          <div className="style1-number memo-text">0{index + 1}</div>

          <div className="style1-content">
            <div className="style1-author-container">
              <div className="style1-profile-image">
                <img
                  // src={story?.authorInfo.profileImage}
                  src={mediumLogoCircles}
                  alt="author profile picture"
                ></img>
              </div>
              <div
                className="style1-author-name memo-text"
                onClick={() => history.push(`/author/${story.id}`)}
              >
                {story?.authorInfo.firstName} {story?.authorInfo.lastName}
              </div>
            </div>
            <div className="style1-story-title-container">
              <div
                className=" style1-story-title memo-text"
                onClick={() => history.push(`/story/${story.id}`)}
              >
                {story?.title}
              </div>
            </div>

            <div className="style1-date-read-time-container flexbetween memo-text">
              <div className="style1-date-content">{date}</div>
              <i className="style1 fa-solid fa-circle"></i>
              <div className="style1-date-read-time-content">
                {/* {story?.readTime} min read */}
                {readTime} min read
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StoryTileOne;
