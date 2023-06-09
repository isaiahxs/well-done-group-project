import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './TrendingBanner.css';
import StoryTileOne from '../StoryTileOne';
import StoryTileOneSkeleton from '../StoryTileOneSkeleton';
import stonks from '../../public/svgexport-3.svg';

const TrendingBanner = () => {
  const stories = useSelector((state) => state.story.stories);
  const loaded = useSelector((state) => state.story.loaded);

  // const dispatch = useDispatch();
  // const [loaded, isLoaded] = useState(false);
  const [trendingStories, setTrendingStories] = useState([]);

  // useEffect(() => {
  //   isLoaded(false);
  //   dispatch(storyActions.getStories()).then(() => {
  //     isLoaded(true);
  //   });
  // }, [dispatch]);


  // useEffect(() => {
  //   isLoaded(false);
  //   setTimeout(() => {
  //     isLoaded(true);
    
  //   }, 1000);
  // }, []);

  useEffect(() => {
    if (stories) {
      setTrendingStories(stories.slice(6, 12));
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
          <StoryTileOneSkeleton />
          <StoryTileOneSkeleton />
          <StoryTileOneSkeleton />
          <StoryTileOneSkeleton />
          <StoryTileOneSkeleton />
          <StoryTileOneSkeleton />
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
