import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './WritePage.css';
import CreatorTile from '../CreatorTile';

const creators = [
  {
    id:1, name: 'Donovan Crader', username:'Dcraderdev', imageUrl: 'https://avatars.githubusercontent.com/u/90993510?v=4', url:'https://github.com/dcraderdev'
  },
  { 
    id:2, name: 'Isaiah Sinnathamby', username:'isaiahxs', imageUrl: 'https://avatars.githubusercontent.com/u/107521578?v=4',url:'https://github.com/isaiahxs'
  }
]


const WritePage = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <>
      {/*  DIV 1 stylings */}

      <div className="writepage">
        <div className="writepage-container1-wrapper align-left">
          <div className="writepage-container1-container">
            <div className="writepage-container1-header small-text spaced">
              START A BLOG FOR FREE
            </div>
            <div className="writepage-container1-header2 header-text align-left">
              Publish, grow, and earn, all in one place.
            </div>
            <div className="writepage-container1-header3 memo-text">
              If you have a story to tell, knowledge to share, or a perspective
              to offer — welcome home. Sign up for free so your writing can
              thrive in a network supported by millions of readers — not ads.
            </div>
            <div className="writepage-container1-button-container flexcenter align-left">
              <div className="writepage-started-button flexcenter memo-text">
                Start writing
              </div>
            </div>
          </div>
        </div>

        {/*  DIV 2 stylings */}

        <div className="writepage-container2-wrapper">
          <div className="writepage-container2-container">
            <div className="writepage-container2-header header-text align-left">
              Join a network of curious minds.
            </div>
          </div>
        </div>

        {/*  DIV 3 stylings */}

        <div className="writepage-container3-wrapper">
        <div className="writepage-container3-container">
          {creators.map(creator => (
            <CreatorTile key={creator.id} creator={creator} />
          ))}
        </div>
        </div>

        {/*  DIV 4 stylings */}

        <div className="writepage-container4-wrapper">
          <div className="writepage-container4-container">
            <div className="writepage-container4-header header-text align-left">
              <div>Create</div>
              <div>your space.</div>
            </div>

            <div className="writepage-container4-header2 memo-text align-left">
              Tell your story your way — with different ways to write, style,
              and brand your work.
            </div>

            <div className="writepage-started-button flexcenter memo-text">
              Start writing
            </div>
          </div>
        </div>

        {/*  DIV 5 stylings */}

        <div className="writepage-container5-wrapper">
          <div className="writepage-container5-container">
            <div className="writepage-container5-header header-text flexcenter">
              Find and grow your audience.
            </div>

            <div className="writepage-container5-header2 memo-text">
              With simple tools and features, you have the chance to connect
              with over 100 million curious readers.
            </div>
          </div>
        </div>

        {/*  DIV 6 stylings */}

        <div className="writepage-container6-wrapper">
          <div className="writepage-container6-container">
            <div className="writepage-container6-header align-left header-text">
              Audience insights.
            </div>

            <div className="writepage-container6-header2 memo-text">
              With simple tools and features, you have the chance to connect
              with over 100 million curious readers.
            </div>
          </div>
        </div>

        <div className="writepage-container6-wrapper">
          <div className="writepage-container6-container">
            <div className="writepage-container6-header align-left header-text">
              Social connectivity.
            </div>

            <div className="writepage-container6-header2 memo-text">
              Find people you’re already connected with on Twitter and easily
              share your stories across platforms.
            </div>
          </div>
        </div>

        <div className="writepage-container6-wrapper">
          <div className="writepage-container6-container">
            <div className="writepage-container6-header align-left header-text">
              Powerful network.
            </div>

            <div className="writepage-container6-header2 memo-text">
              Readers can discover and follow you easily with tailored feeds and
              recommendations.
            </div>
          </div>
        </div>

        <div className="writepage-container6-wrapper">
          <div className="writepage-container6-container">
            <div className="writepage-container6-header align-left header-text">
              Email subscriptions.
            </div>

            <div className="writepage-container6-header2 memo-text">
              Reach readers by having your stories delivered straight to their
              inboxes
            </div>
          </div>
        </div>

        <div className="writepage-container6-wrapper">
          <div className="writepage-container6-container">
            <div className="writepage-container6-header align-left header-text">
              Interactive discussions.
            </div>

            <div className="writepage-container6-header2 memo-text">
              Build relationships with your readers through a threaded comments
              section.
            </div>
          </div>
        </div>

        <div className="writepage-container6-wrapper">
          <div className="writepage-container6-container">
            <div className="writepage-container6-header align-left header-text">
              Custom design.
            </div>

            <div className="writepage-container6-header2 memo-text">
              Easily customize your page to stand out and build your brand.
            </div>
          </div>
        </div>

        {/* DIV 12 Stylings */}
        <div className="ourstorypage-footer-container flexcenter">
          <div className="ourstorypage-footer-logo" onClick={handleLogoClick}>
            <b>Medium</b>
          </div>
          <div className="ourstorypage-footer">
            <div className="ourstorypage-footer-note memo-text">
              Every idea needs a Medium
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WritePage;
