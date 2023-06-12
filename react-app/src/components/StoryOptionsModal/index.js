import React, { useContext, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';
import * as storyActions from '../../store/story';
import './StoryOptionsModal.css';

function StoryOptionsModal() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { modal, openModal, closeModal, needsRerender, setNeedsRerender } = useContext(ModalContext);
    const formRef = useRef(null);
    const currentStory = useSelector(state => state.story.currentStory);
    // const {id} = useParams();


  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
          closeModal();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const deleteCurrentStory = (e) => {
        dispatch(storyActions.deleteStory(currentStory.id))
        history.push('/home')
        closeModal();
    }
  
    return (
      <div className="story-options-menu" ref={formRef}>
        <div className="story-options-button" onClick={deleteCurrentStory}>
          Delete Story
        </div>
      </div>
    );
  }
  
  export default StoryOptionsModal;