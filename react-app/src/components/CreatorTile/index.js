import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CreatorTile.css';
import * as storyActions from '../../store/story'



const CreatorTile = ({ creator }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState('')

  

  const navToGitHub = () => {

    window.location.href = creator.url;

  }


  return (
    <>


    <div className="creatortile-wrapper" onClick={navToGitHub}>
      <div className="creatortile-container flex">
        <div className="creatortile-author-container">
        <div className="creatortile-profile-image">
                <img
                  src={creator.imageUrl}
                  alt="author profile picture"
                ></img>
             
          </div>
          <div className="creatortile-names-container memo-text">
            <div>{creator.name}</div>
            <div className='creatortile-username'>@{creator.username}</div>
            
          </div>
        </div>



      </div>

    </div>

    
    
    </>
  );
};
export default CreatorTile;


