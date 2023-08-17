import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import linkedin from '../../assets/images/linkedin-logo.svg';
import github from '../../assets/images/github-logo.svg';
import './CreatorTile.css';
import * as storyActions from '../../store/story'



const CreatorTile = ({ creator }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState('')



  const navToGitHub = () => {
    window.location.href = creator.github_url;
  }

  const navToLinkedIn = () => {

  }


  return (
    <>


      <div className="creatortile-wrapper">
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
              {/* <div className='creatortile-username'>GitHub: {creator.username}</div> */}
              <div className='socials-container'>
                <div className='linkedin-link'>
                  <a href={creator.linkedin_url} target='_blank' rel='noopener noreferrer'>
                    <img className='linkedin-logo' src={linkedin} alt='LinkedIn Logo' />
                  </a>
                </div>

                <div className='github-link'>
                  <a href={creator.github_url} target='_blank' rel='noopener noreferrer'>
                    <img className='github-logo' src={github} alt='GitHub Logo' />
                  </a>
                </div>
              </div>

            </div>
          </div>



        </div>

      </div>



    </>
  );
};
export default CreatorTile;


