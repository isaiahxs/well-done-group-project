import React, { useContext} from 'react';
import './StoryTileFourSkeleton.css';
import { WindowContext } from '../../context/WindowContext';


const StoryTileFourSkeleton = () => {
  const { windowSize } = useContext(WindowContext);
  const isMobileView = windowSize <= 750;
  
  return (
    <div className={`story-tile-4-skeleton ${isMobileView ? 'small' : ''}`}>
      <div className="skeleton-style4-content">
        <div className="skeleton-style4-author-container shimmer"></div>
        <div className="skeleton-style4-story-title-container shimmer"></div>
      </div>
      <div className={`skeleton-style4-story-image ${isMobileView ? 'small' : ''} shimmer`}></div>
    </div>
  );
}

export default StoryTileFourSkeleton;


