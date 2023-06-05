import { useDispatch, useSelector } from 'react-redux';
import { React, useState, useEffect, useContext } from 'react';
import { Route, Router, Switch, NavLink, useLocation } from 'react-router-dom';

import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import OurStoryPage from './components/OurStoryPage';
import WritePage from './components/WritePage';
import StoryPage from './components/StoryPage';
import LoginModal from './components/LoginModal';
import * as storyActions from './store/story';
import LoginFormModal from './components/LoginFormModal';
import { ModalContext } from './context/ModalContext';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);
  const state = useSelector(state=>state)
  const user = useSelector(state=>state.session.user)
  const { modal, openModal, closeModal, setUpdateObj } = useContext(ModalContext);

  console.log(state);
  
  
  useEffect(() => {

    dispatch(authenticate())

    dispatch(storyActions.initialLoad()).then(() => {
      setIsLoaded(true)
    });

  }, [dispatch]);

  console.log(modal);


  return (
    <>


        {/* <div className={ modal === 'profileMenu'? 'modal-container-transparent': 'modal-container' }>
          {modal === 'login' && <LoginModal />}
          {modal === 'signup' && <SignupModal />}
        </div> */}


        {((modal === 'login' || modal === 'signup')) && (
        <div
          className={
            modal === 'profileMenu'
              ? 'modal-container-transparent'
              : 'modal-container'
          }
        >
          {modal === 'login' && <LoginModal />}
          {/* {modal === 'signup' && <SignupModal />} */}
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

          {/* <Route path="/login" >
            <LoginFormModal />
          </Route> */}

          <Route path="/signup">
            <SignupFormPage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
