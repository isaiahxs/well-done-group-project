import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './StoryTileTwo.css';
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';
import { WindowContext } from '../../context/WindowContext';
import openBook from '../../public/open-book.png';
import quill from '../../public/quill.png';
import userOutline from '../../public/user-outline.png';
import fountainPen from '../../public/fountain-pen.png';

const StoryTileTwo = ({ story, index }) => {
  const history = useHistory();
  const [date, setDate] = useState('Dec 25, 2560')
  const [readTime, setReadTime] = useState(4)
  const {windowSize} = useContext(WindowContext)
  const [thumbnail, setThumbnail] = useState('')
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
          {story?.authorInfo?.profileImage && (
                <img
                  src={story?.authorInfo.profileImage}
                  alt="author profile picture"
                ></img>
              )}
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
          <div className="style2-header-content">{story.content.slice(0,80) + '...'}</div>
        </div>)}

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


