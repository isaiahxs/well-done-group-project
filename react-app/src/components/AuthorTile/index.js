import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './AuthorTile.css';
import * as storyActions from '../../store/story'


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
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [following, setFollowing] = useState(false);
  const [userId, setUserId] = useState(null)
  const followedAuthorIds = useSelector(state=>state.session.followedAuthorIds)
  const user = useSelector(state=>state.session.user)


  useEffect(()=>{
    setUserId(null)
    if(user){
      setUserId(user.id)
    }
  },[user])
 
  useEffect(()=>{

    if(author.firstName){
      setName(`${author.firstName} ${author.lastName}`)
    }

    if(author && author.authorInfo){
        setName(`${author.authorInfo.firstName} ${author.authorInfo.lastName}`)
    }

    setFollowing(()=> {
      if(followedAuthorIds){
        return followedAuthorIds.find(id=>author.id===id)
      } else {
        return false
      }
    } )


  },[author, followedAuthorIds]);

  const handleFollow = async () => {
    if(following){
      await dispatch(storyActions.unfollowAuthor(author.id))
    }
    if(!following){
      await dispatch(storyActions.followAuthor(author.id))
    }
  }


  return (
    <>
    {author && (

    <div className="authortile-style1-wrapper">
      <div className="authortile-style1-container flex">
        <div className="style1-author-container">
        <div className="style1-profile-image">
          {author && author.profileImage && (
                <img
                  className='profile-picture'
                  src={author.profileImage}
                  alt="author profile icon"
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
              <div className='authortile-style1-followers-header'>Member since: {author.createdAt.slice(0, 16)}</div>
            </div>

            {userId !== author.id || !userId && (
              <div className='authortile-style1-followers-container'>
                <div className='authortile-style1-follow-button' onClick={handleFollow}>{following ? 'Unfollow' : 'Follow'}</div>
              </div>
            )}

      </div>

    </div>
    )}


    
    
    </>
  );
};
export default AuthorTile;


