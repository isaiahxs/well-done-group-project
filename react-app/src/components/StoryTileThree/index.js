import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './StoryTileThree.css';
// import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';
import { WindowContext } from '../../context/WindowContext';
import openBook from '../../public/open-book.png';
import quill from '../../public/quill.png';
import userOutline from '../../public/user-outline.png';
import fountainPen from '../../public/fountain-pen.png';
import parse from 'html-react-parser';

const StoryTileThree = ({ story }) => {
  const history = useHistory();
  const [date, setDate] = useState('Dec 25, 2560')

  const {windowSize} = useContext(WindowContext)
  const [thumbnail, setThumbnail] = useState('')
  const [profileImageSrc, setProfileImageSrc] = useState('');
  const user = useSelector((state) => state.session.user);
  const [storyContent, setStoryContent] = useState('')

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
      let parsedContent = parse(story.content.slice(0,80) + '...')
      setStoryContent(parsedContent)
      let month = story?.createdAt.slice(8,11)
      let day = story?.createdAt.slice(5,7)
      setDate(`${month} ${day}`)

      if(!story.images.length){
        setThumbnail('https://miro.medium.com/v2/resize:fit:1200/1*jfdwtvU6V6g99q3G7gq7dQ.png')
      }    
      if(story.images.length){
        setThumbnail(story.images[0].url)
      }


    }
   




  },[story])


  return (
    <div className="story-tile-style3">
      <div className="style3-content">
        <div className="style3-author-container">
          <div className="style3-profile-image">
          {story?.authorInfo?.profileImage && (
                <img
                  src={story?.authorInfo.profileImage}
                  alt="author profile icon"
                ></img>
              )}
          </div>
          <div 
          className="style3-author-name memo-text"
          onClick={() => history.push(`/author/${story.id}`)}>
            {story?.authorInfo.firstName} {story?.authorInfo.lastName}
          </div>
        </div>
        <div className="style3-story-title-container">
          <div className=" style3-story-title memo-text" onClick={() => history.push(`/story/${story.id}`)}>{story?.title}</div>
        </div>
      </div>
    </div>
  );
};
export default StoryTileThree;


