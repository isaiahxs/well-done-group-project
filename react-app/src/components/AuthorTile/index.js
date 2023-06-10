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
import * as storyActions from '../../store/story'


const profileImages = {
  'quill': quill,
  'user-outline': userOutline,
  'open-book': openBook,
  'fountain-pen': fountainPen,
}

const AuthorTile = ({ author }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState('')

  const [profileImageSrc, setProfileImageSrc] = useState('');
  const [numFollowers, setNumFollowers] = useState(0);
  const [following, setFollowing] = useState(false);
  const followedAuthorIds = useSelector(state=>state.session.followedAuthorIds)

  console.log(followedAuthorIds);

  const getProfileImageSrc = (profileImage) => {
    return profileImages[profileImage] || profileImage;
  };
 
  useEffect(()=>{
    console.log(author);

      if(author.firstName){
        setName(`${author.firstName} ${author.lastName}`)
      }
    
      if(author.profileImage){
        setProfileImageSrc(getProfileImageSrc(author.profileImage));
      }
      if(author.followers){
        setNumFollowers(author.followers.length);
      }

    if(author && author.authorInfo){
        setNumFollowers(author.authorInfo.followers.length);
        setName(`${author.authorInfo.firstName} ${author.authorInfo.lastName}`)
        setProfileImageSrc(getProfileImageSrc(author.authorInfo.profileImage));
    }

    setFollowing(()=> {
      return followedAuthorIds.find(id=>author.id===id)
    } )



  },[author, followedAuthorIds]);

  const handleFollow = () => {
    if(following){
      dispatch(storyActions.unfollowAuthor(author.id))

    }
    if(!following){
      dispatch(storyActions.followAuthor(author.id))
    }
  }


  return (
    <>
    {author && (

    <div className="authortile-style1-wrapper">
      <div className="authortile-style1-container flex">
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

            <div className='authortile-style1-followers-container'>
              <div className='authortile-style1-followers-header'>Followers</div>
              <div className='authortile-style1-followers-header'>{numFollowers}</div>
            </div>

            <div className='authortile-style1-followers-container'>
              <div className='authortile-style1-follow-button' onClick={handleFollow}>{following ? 'Unfollow' : 'Follow'}</div>
            </div>

      </div>

    </div>
    )}


    
    
    </>
  );
};
export default AuthorTile;


