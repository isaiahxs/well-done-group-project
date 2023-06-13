import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './StoryTileTwo.css';
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';
import { WindowContext } from '../../context/WindowContext';

const StoryTileTwo = ({story}) => {
  const history = useHistory();
  const [date, setDate] = useState('Dec 25, 2560')
  const {windowSize} = useContext(WindowContext)
  const [thumbnail, setThumbnail] = useState('')
  const [name, setName] = useState('')

  const [loaded, setLoaded] = useState(false)
  const [fadeTrigger, setFadeTrigger] = useState(false);




console.log(fadeTrigger);

  useEffect(()=>{

    setFadeTrigger(false)
    
    if(story){

      let month = story?.createdAt.slice(8,11)
      let day = story?.createdAt.slice(5,7)
      setDate(`${month} ${day}`)


    }


    if(story.images && !story.images.length){
      setThumbnail('https://miro.medium.com/v2/resize:fit:1200/1*jfdwtvU6V6g99q3G7gq7dQ.png')
    }    
    if(story.images && story.images.length){
      setThumbnail(story.images[0].url)
    }


    if(story.authorInfo){
      setName(`${story.authorInfo.firstName} ${story.authorInfo.lastName}`)
    }

    if(story.author){
      setName(`${story.authorInfo.firstName} ${story.authorInfo.lastName}`)
    }

    setTimeout(() => {
      setFadeTrigger(true);
    }, 100);


  },[story])



  return (

    <div className="story-tile-style2 fade-in">
      <div className="style2-content">
        <div className="style2-author-container">
          <div className="style2-profile-image"
          onClick={() => history.push(`/author/${story.id}`)}>
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
            {name}
          </div>
        </div>

        <div className="style2-story-title-container">
          <div 
            className=" style2-story-title memo-text" onClick={() => history.push(`/story/${story.id}`)}>{story?.title}
          </div>
        </div>

        {windowSize > 699 && (<div className="style2-header-container flexbetween memo-text">
          <div 
            className="style2-header-content" onClick={() => history.push(`/story/${story.id}`)}>{story.slicedIntro}
          </div>
        </div>)}

        <div className="style2-date-read-time-container flexbetween memo-text">
          <div className="style2-date-content">{date}</div>
          <i className="style2 fa-solid fa-circle"></i>
          <div className="style2-date-read-time-content">
            {story?.timeToRead} min read
          </div>
        </div>

      </div>

      <div className={`style2-story-image`}>
        <img
          src={thumbnail}
          alt={'profile image'}
          onClick={() => history.push(`/story/${story.id}`)}
        ></img>
      </div>
    </div>
  );
};
export default StoryTileTwo;
