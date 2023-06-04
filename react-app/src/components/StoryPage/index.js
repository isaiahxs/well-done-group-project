import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './StoryPage.css';
// import mobileViewPhoto from '../../public/creator-find-points-iphones.png';
// import playStoreBtn from '../../public/PlayStore_2x.png';
// import appleStoreBtn from '../../public/AppleStore_2x.png';
// import supportWriters from '../../public/svgexport-5.svg';
// import readUnlimited from '../../public/svgexport-6.svg';
import { WindowContext } from '../../context/WindowContext';

const StoryPage = () => {
  const history = useHistory();

  const {scrollPosition, windowSize} = useContext(WindowContext)
  console.log(scrollPosition);
  console.log(windowSize);

  const isMobileView = windowSize <= 765;




  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogoClick = () => {
    history.push('/');
  };

  return (


    <>
    
    {/*  DIV 1 stylings */}
      {isMobileView && (
        <div className="writepage">
      <div className="writepage-mobile-container1 align-left">
          <div className="writepage-container1-header small-text spaced">
            START A BLOG FOR FREE
          </div>
            <div className="writepage-container1-header2 header-text align-left">
              Publish, grow, and earn, all in one place.
            </div>
            <div className="writepage-container1-header3 quote-text">
              If you have a story to tell, knowledge to share, or a perspective
              to offer — welcome home. Sign up for free so your writing can
              thrive in a network supported by millions of readers — not ads.
          </div>
          <div className="writepage-container1-button-container flexcenter align-left">

            <div className="writepage-started-button flexcenter quote-text">Start writing</div>

          </div>
        </div>


    {/*  DIV 2 stylings */}

      <div className="writepage-mobile-container2">
          <div className="writepage-container2-header header-text align-left">
            Join a network
            of curious
            minds.
        </div>
          
      </div>   



    {/*  DIV 3 stylings */}

    <div className="writepage-mobile-container3">
        <div className='author-tile'>AUTHOR TILE</div>
        <div className='author-tile'>AUTHOR TILE</div>
        <div className='author-tile'>AUTHOR TILE</div>
        <div className='author-tile'>AUTHOR TILE</div>
        <div className='author-tile'>AUTHOR TILE</div>
        <div className='author-tile'>AUTHOR TILE</div>

          
    </div>   



    {/*  DIV 4 stylings */}

    <div className="writepage-mobile-container4">
        <div className="writepage-container4-header header-text align-left">
          <div>Create</div>
          <div>your space.</div>  
        </div>

        <div className="writepage-container4-header2 quote-text align-left">
          Tell your story your way — with different ways to write, style, and brand your work.
        </div>

        <div className="writepage-started-button flexcenter quote-text">Start writing</div>

          
    </div>   


        </div>        
      )}
















    {!isMobileView && (
      <div className="writepage">

          <div className="writepage-banner-container">
            <div className="writepage-banner-section">
              <div className="writepage-banner-header-small">
                START A BLOG FOR FREE
              </div>
              <div className="writepage-banner-header-container">
                <div className="header-text">
                  Publish, grow, and earn, all in one placeeeeeeee.
                </div>
              </div>
              <div className="writepage-banner-content">
                <div className="quote-text">
                  If you have a story to tell, knowledge to share, or a perspective
                  to offer — welcome home. Sign up for free so your writing can
                  thrive in a network supported by millions of readers — not ads.
                </div>
              </div>

              <div className="writepage-started-button flexcenter">Get started</div>
            </div>

            <div className="writepage-expand-section-right">
              <div className="writepage-box-container">Spinning box</div>
            </div>
          </div>
          </div>

      )}

</>

  );
};
export default StoryPage;
