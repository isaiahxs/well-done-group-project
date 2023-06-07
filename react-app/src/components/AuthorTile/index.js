import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './AuthorTile.css';
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';
import { WindowContext } from '../../context/WindowContext';
import openBook from '../../public/open-book.png';
import quill from '../../public/quill.png';
import userOutline from '../../public/user-outline.png';
import fountainPen from '../../public/fountain-pen.png';

const AuthorTile = ({ author, index }) => {
  const history = useHistory();
  const [date, setDate] = useState('Dec 25, 2560')
  const [readTime, setReadTime] = useState(4)
  const {windowSize} = useContext(WindowContext)
  const [thumbnail, setThumbnail] = useState('')
  const [profileImageSrc, setProfileImageSrc] = useState('');
  const user = useSelector((state) => state.session.user);



  useEffect(()=>{
    if(author && author.profileImage){
      if(author.profileImage === 'quill'){
        setProfileImageSrc(quill)
      }
      else if(author.profileImage === 'user-outline'){
        setProfileImageSrc(userOutline)
      }
      else if(author.profileImage === 'open-book'){
        setProfileImageSrc(openBook)
      }
      else if(author.profileImage === 'fountain-pen'){
        setProfileImageSrc(fountainPen)
      }
      else {
        setProfileImageSrc(author.profileImage)
      }
    }

  },[author]);





  return (
    <div className="auhtor-tile-style1">
      <div className="style1-content">
        <div className="style1-author-container">
          {author&&(<div className="style1-profile-image">
          {author.profileImage && (
                <img
                  src={author.profileImage}
                  alt="author profile picture"
                ></img>
              )}
          </div>)}
          <div 
          className="style1-author-name memo-text"
          onClick={() => history.push(`/author/${author.id}`)}>
            {author.firstName} {author.lastName}
          </div>
        </div>

      </div>

    </div>
  );
};
export default AuthorTile;


