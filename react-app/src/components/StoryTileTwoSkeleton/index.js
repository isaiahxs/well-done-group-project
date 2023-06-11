import React from 'react';
import './StoryTileTwoSkeleton.css';

const StoryTileTwoSkeleton = () => {
  return (
    <div className="story-tile-two-skeleton">
      <div className="skeleton-style2-content">
        <div className="skeleton-style2-author-container shimmer"></div>
        <div className="skeleton-style2-story-title-container shimmer"></div>
      </div>
      <div className="skeleton-style2-story-image shimmer"></div>
    </div>
  );
}

export default StoryTileTwoSkeleton;


