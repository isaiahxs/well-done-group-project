import React, { createContext, useEffect, useState, useRef } from 'react';

export const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const searchInputRef = useRef();
  const commentRef = useRef()

  useEffect(() => {


    const handleResize = () => {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
 
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <WindowContext.Provider value={ {windowSize, scrollPosition, searchInputRef, commentRef} }>
      {children}
    </WindowContext.Provider>
  );
};
