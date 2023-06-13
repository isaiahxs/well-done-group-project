import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './StoryPageSkeleton.css';
import parse from 'html-react-parser';
import CommentPanel from '../CommentPanel';
import * as sessionActions from '../../store/session';
import * as storyActions from '../../store/story';
import { ModalContext } from '../../context/ModalContext';
import claps from '../../public/claps.svg';
import shining_star from '../../public/shining_star.svg';
import triple_dots_icon from '../../public/triple_dots_icon.svg';
import commentBubble from '../../public/comment.svg';

const StoryPageSkeleton = () => {
  const { openModal } = useContext(ModalContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [date, setDate] = useState('');
  const [showComments, setShowComments] = useState(false);
  const story = useSelector((state) => state.story.currentStory);
  const user = useSelector((state) => state.session.user);

  // const currentUserId = useSelector(state => state.session.user?.id);

  
  return (
    <>

      <div className="story-page">
        {story && (
          <>
            <h4 className="member-only">
              <img
                src={shining_star}
                alt="shining-star"
                className="shining-star"
              />
              Member-only story
            </h4>

            <h1 className="storypageskeleton-story-title shimmer"></h1>




            <div className="author-section flex">
              <img
                src={'https://miro.medium.com/v2/resize:fit:1200/1*jfdwtvU6V6g99q3G7gq7dQ.png'}
                alt="author profile icon"
                className="author-image"
               
              />
              <div className="storypageskeleton-author-information memo-text">
                <div className='author-name-and-follow'>
                  <div className='storypageskeleton-authorname shimmer'>
                    
                  </div>

                    <button className="follow-unfollow-button" >
                      Follow
                    </button>

                </div>
                <div>
                <div className="story-author">


                  <p className="storypageskeleton-time shimmer">

                  </p>
                </div>

                </div>
              </div>
            </div>







            {/* changed original options bar to hide ability to clap/unclap your own stories + show ... only if you're the author of the story you're on */}
            <div className="options-bar">
              <div className="clap-container">
      
                <div className="clap-content">
                  <img src={claps} alt="claps" className="claps-icon" />
                  <div className="claps-count"></div>
                </div>
              
              </div>

              <img src={commentBubble} alt="comment" className="comment-icon" />

             
                <img
                  src={triple_dots_icon}
                  alt="triple-dots-icon"
                  className="triple-dots-icon"
                />
             

              <div className={`overlay ${showComments ? 'active' : ''}`}></div>
            </div>

            <div className="story-content">


            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content med shimmer"> </div>
            <div className="storypageskeleton-story-content med "> </div>

            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content small shimmer"> </div>
            <div className="storypageskeleton-story-content small "> </div>

            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content large shimmer"> </div>
            <div className="storypageskeleton-story-content med shimmer"> </div>
            <div className="storypageskeleton-story-content med "> </div>


            </div>








            <div className="options-bar">
              <div className="clap-container">
      
                <div className="clap-content">
                  <img src={claps} alt="claps" className="claps-icon" />
                  <div className="claps-count"></div>
                </div>
              
              </div>

              <img src={commentBubble} alt="comment" className="comment-icon" />

             
                <img
                  src={triple_dots_icon}
                  alt="triple-dots-icon"
                  className="triple-dots-icon"
                />
             

              <div className={`overlay ${showComments ? 'active' : ''}`}></div>
            </div>

            

            <div className="author-section flex">
              <img
                src={'https://miro.medium.com/v2/resize:fit:1200/1*jfdwtvU6V6g99q3G7gq7dQ.png'}
                alt="author profile icon"
                className="author-image"
               
              />
              <div className="storypageskeleton-author-information memo-text">
                <div className='author-name-and-follow'>
                  <div className='storypageskeleton-authorname shimmer'>
                    
                  </div>

                    <button className="follow-unfollow-button" >
                      Follow
                    </button>

                </div>
                <div>
                <div className="story-author">


                  <p className="storypageskeleton-time shimmer">

                  </p>
                </div>

                </div>
              </div>
            </div>

          </>
        )}
      </div>
    </>
  );
};
export default StoryPageSkeleton;
