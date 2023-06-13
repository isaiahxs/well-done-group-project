import React, { useState, useEffect } from 'react';
import './mTile.css';

const MTile = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [canBeVis, setCanBeVis] = useState(Math.random() * 10000 > 6000 ? true : false);
  const [firstToggler, setFirstToggler] = useState(Math.random() * 10000 > 6000 ? true : false);
  const [canToggle, setCanToggle] = useState(Math.random() * 10000 > 8000 ? true : false);


  useEffect(() => {
    let intervalId;
    let timer;

    // After first effect, set an interval for the next effects
    timer = Math.random() * 6000 + 3500;

    intervalId = setInterval(() => {
      // setCanToggle(Math.random() * 10000 > 4000 ? true : false);
      if(canToggle){
        setCanBeVis(Math.random() * 10000 > 2000 ? true : false);
        setIsVisible(prev => !prev);
      }
    }, timer);

    // Clean up effect when component unmounts
    return () => clearInterval(intervalId);
  });


  return (
    <div className={`m-tile memo-text ${isVisible && canBeVis ? 'visible' : 'hidden'}`}>
      M
    </div>
  );
}; 

export default MTile;
