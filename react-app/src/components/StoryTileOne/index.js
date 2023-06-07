import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './StoryTileOne.css';
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';
import { WindowContext } from '../../context/WindowContext';
import openBook from '../../public/open-book.png';
import quill from '../../public/quill.png';
import userOutline from '../../public/user-outline.png';
import fountainPen from '../../public/fountain-pen.png';
const StoryTileOne = ({ story, index }) => {
  const history = useHistory();
  const [date, setDate] = useState('Dec 25, 2560')
  const {windowSize} = useContext(WindowContext)
  const [readTime, setReadTime] = useState(4)
  const isMobileView = windowSize <= 900;
  const [profileImageSrc, setProfileImageSrc] = useState('');
  const user = useSelector((state) => state.session.user);

  useEffect(()=>{
    if(user && user.profileImage){
      if(user.profileImage === 'quill'){
        setProfileImageSrc(quill)
      }
      else if(user.profileImage === 'user-outline'){
        setProfileImageSrc(userOutline)
      }
      else if(user.profileImage === 'open-book'){
        setProfileImageSrc(openBook)
      }
      else if(user.profileImage === 'fountain-pen'){
        setProfileImageSrc(fountainPen)
      }
      else {
        setProfileImageSrc(user.profileImage)
      }
    }

  },[user]);
  
  useEffect(()=>{
    if(story){
      setDate(story?.createdAt.slice(0,16))
    }
    setReadTime(Math.floor(Math.random() * (20) + 4))
  },[story])


  console.log(story?.authorInfo?.profileImage);


  return (
    <>
      {isMobileView && (
        <div className="story-tile-style1">
          <div className="style1-number memo-text">0{index + 1}</div>

          <div className="style1-content">
            <div className="style1-author-container">
              <div className="style1-profile-image">
{story?.authorInfo?.profileImage && (
                <img
                  src={story?.authorInfo.profileImage}
                  // src={mediumLogoCircles}
                  alt="author profile picture"
                ></img>
                )}
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
              {story?.authorInfo?.profileImage && (
                <img
                  src={story?.authorInfo.profileImage}
                  alt="author profile picture"
                ></img>
              )}
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
