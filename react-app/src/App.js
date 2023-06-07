import { useDispatch, useSelector } from 'react-redux';
import { React, useState, useEffect, useContext } from 'react';
import { Route, Router, Switch, NavLink, useLocation } from 'react-router-dom';

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import OurStoryPage from './components/OurStoryPage';
import WritePage from './components/WritePage';
import StoryPage from './components/StoryPage';
import SigninModal from './components/SigninModal';
import SignupModal from './components/SignupModal';
import ProfileButtonModal from './components/ProfileButtonModal';



import * as storyActions from './store/story';
import { ModalContext } from './context/ModalContext';
import UserHomePage from './components/UserHomePage';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);
  const state = useSelector(state=>state)
  const search = useSelector(state=>state.session.search)
  const user = useSelector(state=>state.session.user)
  const { modal, openModal, closeModal, setUpdateObj } = useContext(ModalContext);

  console.log(state);
  console.log(search);
  
  
  useEffect(() => {

    dispatch(authenticate())

    dispatch(storyActions.initialLoad()).then(() => {
      setIsLoaded(true)
    });

  }, [dispatch]);

  console.log(modal);
 

  return (
    <>


        {((modal === 'signin' || modal === 'signup' || modal === 'profileModal')) && (
        <div
          className={
            modal === 'profileModal'
              ? 'modal-container-transparent'
              : 'modal-container'
          }
        >
          {modal === 'signin' && <SigninModal />}
          {modal === 'signup' && <SignupModal />}
          {modal === 'profileModal' && <ProfileButtonModal />}
        </div>
      )}



      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path="/" exact>
            <HomePage/>
          </Route>

          <Route path="/about" exact>
            <OurStoryPage/>
          </Route>

          <Route path="/write" exact>
            <WritePage/>
          </Route>

          <Route path="/story/:id" exact>
            <StoryPage/>
          </Route>

          <Route path="/author/:id" exact>
            <StoryPage/>
          </Route>

          <Route path="/home" exact>
            <UserHomePage/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
