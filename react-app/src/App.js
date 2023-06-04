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

import * as storyActions from './store/story';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);
  
  
  useEffect(() => {
    dispatch(authenticate()).then(() => {
      dispatch(storyActions.initialLoad()).then(() => {
        setIsLoaded(true)
      });
    });
  }, [dispatch]);

  
  
  
    const state = useSelector(state=>state)


  console.log(state);

  return (
    <>
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

          <Route path="/login" >
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
