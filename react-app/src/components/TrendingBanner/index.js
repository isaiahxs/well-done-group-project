import { React, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TrendingBanner.css';
import StoryTileOne from '../StoryTileOne';
import StoryTileSkeleton from '../StoryTileOneSkeleton';
import stonks from '../../public/svgexport-3.svg';
import * as storyActions from '../../store/story';

const TrendingBanner = () => {
  const stories = useSelector((state) => state.story.stories);

  const dispatch = useDispatch();
  const [loaded, isLoaded] = useState(false);
  const [trendingStories, setTrendingStories] = useState([]);

  useEffect(() => {
    isLoaded(false);
    dispatch(storyActions.getStories()).then(() => {
      isLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (stories) {
      setTrendingStories(stories.slice(0, 6));
    }
  }, [stories]);

  return (
    <div className="main-page-trending-banner-container">
      <div className="trending-banner-header">
        <div className="trending-image-container">
          <img
            src={stonks}
            alt="Trending on medium"
            className="main-page-trending-image"
          />
        </div>

        <div className="memo-text"> Trending on Medium </div>
      </div>

      {!loaded && (
        <div className="main-page-trending-tile-container">
          <StoryTileSkeleton />
          <StoryTileSkeleton />
          <StoryTileSkeleton />
          <StoryTileSkeleton />
          <StoryTileSkeleton />
          <StoryTileSkeleton />
        </div>
      )}

      {loaded && (
        <div className="main-page-trending-tile-container">
          {trendingStories.map((story, i) => (
            <StoryTileOne key={i} index={i} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};
export default TrendingBanner;
