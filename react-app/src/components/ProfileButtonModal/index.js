import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';

import './ProfileButtonModal.css';

function ProfileButtonModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { modal, openModal, closeModal, needsRerender, setNeedsRerender } = useContext(ModalContext);
  const formRef = useRef(null);
  const user = useSelector(state => state.session.user);


console.log('opening!');

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

  const logout = (e) => {

    history.push('/');
    closeModal();
    dispatch(sessionActions.logout())
  };

  


  return (
    
    
    <div className="profile-menu" ref={formRef}>
      <div className="profile-dropdown">
        <div className="greeting">Hello, {user.firstName}</div>
        <button className="my-stories">My Stories</button>
        <button className="profilemenu-logout-button" onClick={logout}>
          Sign out
        </button>
      </div>
    </div>

    // settings


  );
}

export default ProfileButtonModal;