import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './OurStoryPage.css';
import mobileViewPhoto from '../../public/creator-find-points-iphones.png';
import playStoreBtn from '../../public/PlayStore_2x.png';
import appleStoreBtn from '../../public/AppleStore_2x.png';
import supportWriters from '../../public/svgexport-5.svg';
import readUnlimited from '../../public/svgexport-6.svg';
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';
import spinningCube from '../../public/spinning-cube.png';
import spinningSphere from '../../public/spinning-sphere.png';

const OurStoryPage = () => {

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


const handleLogoClick = () => {
  history.push('/');
};

const navToWrite = () => {
  history.push('/write');
};


  return (
    <div className="ourstorypage">

      {/*  DIV 1 stylings */}

      <div className="ourstorypage-banner-container">
        <div className="ourstorypage-banner-content header-text">
          Every idea needs a <b className="medium-bold">Medium</b>.
        </div>
      </div>


      {/*  DIV 2 stylings */}

      <div className="ourstorypage-story-container flexcenter">
        <div className="ourstorypage-story-section flexcenter">
          <div className="ourstorypage-story-content memo-text">
            The best ideas can change who we are. Medium is where those ideas
            take shape, take off, and spark powerful conversations. We’re an
            open platform where over 100 million readers come to find insightful
            and dynamic thinking. Here, expert and undiscovered voices alike
            dive into the heart of any topic and bring new ideas to the surface.
            Our purpose is to spread these ideas and deepen understanding of the
            world.
            <p></p>
            <p></p>
            We’re creating a new model for digital publishing. One that supports
            nuance, complexity, and vital storytelling without giving in to the
            incentives of advertising. It’s an environment that’s open to
            everyone but promotes substance and authenticity. And it’s where
            deeper connections forged between readers and writers can lead to
            discovery and growth. Together with millions of collaborators, we’re
            building a trusted and vibrant ecosystem fueled by important ideas
            and the people who think about them.
          </div>
        </div>
        <div className="ourstorypage-story-section flexcenter">
          <div className="ourstorypage-story-image flexcenter">
            <img
              src={spinningSphere}
              alt="Spinning sphere of words"
              className="ourstorypage-spinning-cube"
            />
          </div>
        </div>
      </div>


      {/*  DIV 3 stylings */}

      <div className="ourstorypage-living-network-container flexcenter">
        <div className="ourstorypage-living-network-header-container flexcenter">
          <div className="header-text flexcenter">A living network of curious minds.</div>
        </div>
        <div className="ourstorypage-living-network-content memo-text">
          Anyone can write on Medium. Thought-leaders, journalists, experts, and
          individuals with unique perspectives share their thinking here. You’ll
          find pieces by independent writers from around the globe, stories we
          feature and leading authors, and smart takes on our own suite of blogs
          and publications.
        </div>
      </div>

      {/*  DIV 4 stylings */}


      <div className="ourstorypage-creators-container">
        <div className="ourstorypage-creator-tile">Creators tile</div>
        <div className="ourstorypage-creator-tile">Creators tile</div>
      </div>

      {/* DIV 5 Stylings */}

      <div className="ourstorypage-100-million-container">
        <div className="ourstorypage-100-million-section left">
          <div className="ourstorypage-100-million-content header-text align-left">
            Over 100 million readers and growing.
          </div>
        </div>

        <div className="ourstorypage-100-million-section right">
          <div className="ourstorypage-quote-image-container">
            <div className="ourstorypage-quote-image">
              




            
            <img
              src={mediumLogoCircles}
              alt="Medium circle logo"
              className="ourstorypage-medium-logo-circle"
            />


            </div>
          </div>
          <div className="ourstorypage-quote-container">
            <div className="ourstorypage-quote-quote  memo-text">
              "Medium is trying to shift the paradigm. They’re catering to those
              looking for fresh, new, authentic voices. I believe wholeheartedly
              in their mission."
              <p></p>
              Joel Leon
            </div>
          </div>
        </div>
      </div>

      {/* DIV 6 Stylings */}

      <div className="ourstorypage-create-content-container flexcenter">
        <div className="ourstorypage-create-content-header-container">
          <div className="header-text flexcenter">
            Create the space for your thinking to take off.
          </div>
        </div>
        <div className="ourstorypage-create-content  memo-text">
          A blank page is also a door. At Medium you can walk through it. It's
          easy and free to share your thinking on any topic, connect with an
          audience, express yourself with a range of publishing tools, and even
          earn money for your work.
        </div>

        <div className="ourstorypage-create-content-button memo-text flexcenter" onClick={navToWrite}>
          Write on Medium
        </div>
      </div>

      {/* DIV 7 Stylings */}

      <div className="ourstorypage-membership-container flexcenter">
        <div className="ourstorypage-membership-header">
          <div className="header-text">Get more with membership.</div>
        </div>
        <div className="ourstorypage-membership content-text">
          Become a Medium member to enjoy unlimited access and directly support
          the writers you read most.
        </div>
        <div className="ourstorypage-membership-button flexcenter">
          See membership options
        </div>
      </div>

      {/* DIV 8 Stylings */}

      <div className="ourstorypage-read-reward-container">
        <div className="ourstorypage-read-reward-section">
          <div className="ourstorypage-read-reward-header header-text align-left">
            Read as much as you want.
          </div>
          <div className="ourstorypage-read-reward-image">
            <img
              src={supportWriters}
              alt="mobile view example image"
              className="ourstorypage-take-medium-image"
            />
          </div>
          <div className="ourstorypage-read-reward-memo memo-text">
            Enjoy unlimited access to every story across all of your devices.
          </div>
        </div>
        <div className="ourstorypage-read-reward-section">
          <div className="ourstorypage-read-reward-header header-text">
            Reward quality content.
          </div>
          <div className="ourstorypage-read-reward-image">
            <img
              src={readUnlimited}
              alt="mobile view example image"
              className="ourstorypage-take-medium-image"
            />
          </div>
          <div className="ourstorypage-read-reward-memo memo-text">
            Your membership helps us pay writers, and keeps your experience
            ad-free.
          </div>
        </div>
      </div>

      {/* DIV 9 Stylings */}

      <div className="ourstorypage-take-medium-container">
        <div className="ourstorypage-take-medium-section">
          <div className="ourstorypage-take-medium-header header-text align-left">
            Take Medium with you.
          </div>

          <div className="ourstorypage-take-medium-memo memo-text">
            Download our app so you can read wherever you are.
          </div>

          <div className="ourstorypage-download-buttons-container flexbetween">
            <div className="ourstorypage-apple-store-button">
              <img
                src={appleStoreBtn}
                alt="mobile view example image"
                className="ourstorypage-take-medium-image"
              />
            </div>
            <div className="ourstorypage-play-store-button">
              {' '}
              <img
                src={playStoreBtn}
                alt="mobile view example image"
                className="ourstorypage-take-medium-image"
              />
            </div>
          </div>
        </div>

        <div className="ourstorypage-take-medium-image-container">
          <img
            src={mobileViewPhoto}
            alt="mobile view example image"
            className="ourstorypage-take-medium-image"
          />
        </div>
      </div>

      {/* DIV 10 Stylings */}

      <div className="ourstorypage-learn-more-container">
        <div className="ourstorypage-learn-more-section-left">
          <div className="ourstorypage-learn-more-header">
            <div className="header-text align-left">
              Learn more about us. Or join us.
            </div>
          </div>
        </div>
        <div className="ourstorypage-learn-more-section-right">
          <div className="ourstorypage-learn-more-section-right-top">
            <div>
              <div className="ourstorypage-learn-more-header">
                The Medium blog
              </div>
              <div className="ourstorypage-learn-more-content">
                Visit our company blog for the latest news, product updates, and
                tips and tricks.
              </div>
            </div>
            <div className="ourstorypage-blog-button flexcenter">
              Read our blog
            </div>
          </div>

          <div className="ourstorypage-learn-more-section-right-bottom">
            <div>
              <div className="ourstorypage-learn-more-header">
                Work at Medium
              </div>
              <div className="ourstorypage-learn-more-content">
                Our team is home to engineers, journalists, artists, and
                creatives of all stripes.
              </div>
            </div>

            <div className="ourstorypage-work-button flexcenter">
              View open positions
            </div>
          </div>
        </div>
      </div>

      {/* DIV 11 Stylings */}

      <div className="ourstorypage-expand-container">
        <div className="ourstorypage-expand-section-left flexcenter">
          <div className="ourstorypage-box-container flexcenter">
            

            <img
              src={spinningCube}
              alt="Spinning cube of words"
              className="ourstorypage-spinning-cube"
            />



          </div>
        </div>
        <div className="ourstorypage-expand-section">
          <div className="ourstorypage-expand-header">
            <div className="header-text align-left">
              Read, write, and expand your world.
            </div>
          </div>
          <div className="ourstorypage-started-button flexcenter"  onClick={navToWrite}>
            Get started
          </div>
        </div>
      </div>

      {/* DIV 12 Stylings */}
      <div className="ourstorypage-footer-container flexcenter">
        <div className="ourstorypage-footer-logo" onClick={handleLogoClick}>
          <b>Medium</b>
        </div>
        <div className="ourstorypage-footer-buttons">
          <div className="ourstorypage-footer-button">Terms</div>
          <div className="ourstorypage-footer-button">Privacy</div>
          <div className="ourstorypage-footer-button">Help</div>
        </div>
      </div>
    </div>
  );
};
export default OurStoryPage;



