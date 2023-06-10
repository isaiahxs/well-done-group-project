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


const profileImages = {
  'quill': quill,
  'user-outline': userOutline,
  'open-book': openBook,
  'fountain-pen': fountainPen,
}

const AuthorTile = ({ author }) => {
  const history = useHistory();
  const [name, setName] = useState('')

  const [profileImageSrc, setProfileImageSrc] = useState('');


  const getProfileImageSrc = (profileImage) => {
    return profileImages[profileImage] || profileImage;
  };
 
  useEffect(()=>{

      if(author.firstName){
        setName(`${author.firstName} ${author.lastName}`)
      }
    
      if(author.profileImage){
        setProfileImageSrc(getProfileImageSrc(author.profileImage));
      }


    if(author && author.authorInfo){
        setName(`${author.authorInfo.firstName} ${author.authorInfo.lastName}`)
        setProfileImageSrc(getProfileImageSrc(author.authorInfo.profileImage));
    }
      

  },[author]);





  return (
    <>
    {author && (

    <div className="auhtor-tile-style1">
      <div className="style1-content">
        <div className="style1-author-container">
          <div className="style1-profile-image">
          {profileImageSrc && (
                <img
                  src={profileImageSrc}
                  alt="author profile picture"
                ></img>
              )}
          </div>
          <div 
          className="style1-author-name memo-text"
          onClick={() => history.push(`/author/${author.id}`)}>
            {name}
          </div>
        </div>

      </div>

    </div>
    )}


    
    
    </>
  );
};
export default AuthorTile;


