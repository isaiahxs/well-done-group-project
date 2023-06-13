import { useDispatch } from 'react-redux';
import { React, useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import OurStoryPage from './components/OurStoryPage';
import WritePage from './components/WritePage';
import StoryPage from './components/StoryPage';
import SigninModal from './components/SigninModal';
import SignupModal from './components/SignupModal';
import ProfileButtonModal from './components/ProfileButtonModal';
import StoryOptionsModal from './components/StoryOptionsModal';
import CreateStoryPage from './components/CreateStoryPage';

import * as storyActions from './store/story';
import { ModalContext } from './context/ModalContext';
import FeedPage from './components/FeedPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const state = useSelector((state) => state);
  // const search = useSelector((state) => state.session.search);
  // const user = useSelector((state) => state.session.user);
  const { modal } =
    useContext(ModalContext);

  // console.log(state);
  // console.log(search);



  useEffect(() => {
    dispatch(authenticate())
      .then(() => {
        dispatch(storyActions.initialLoad());
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  return (
    <>
      {(modal === 'signin' ||
        modal === 'signup' ||
        modal === 'profileModal' ||
        modal === 'storyOptionsModal') && (
        <div
          className={
            modal === 'profileModal' ||
            modal === 'storyOptionsModal'
              ? 'modal-container-transparent'
              : 'modal-container'
          }
        >
          {modal === 'signin' && <SigninModal />}
          {modal === 'signup' && <SignupModal />}
          {modal === 'profileModal' && <ProfileButtonModal />}
          {modal === 'storyOptionsModal' && <StoryOptionsModal />}
        </div>
      )}

      {isLoaded && <Navigation />}
      {isLoaded && (
        <Switch>
          <Route path="/home" exact>
            <FeedPage />
          </Route>

          <Route path="/about" exact>
            <OurStoryPage />
          </Route>

          <Route path="/write" exact>
            <WritePage />
          </Route>

          <Route path="/story/:id" exact>
            <StoryPage />
          </Route>

          <Route path="/author/:id" exact>
            <StoryPage />
          </Route>


          <Route path="/create" exact>
            <CreateStoryPage />
          </Route>

          <Route path="/create/:id/edit" exact>
            <CreateStoryPage />
          </Route>

          <Route path="/" exact>
            <HomePage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
