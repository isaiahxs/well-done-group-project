import React from 'react';
import './StoryTileOneSkeleton.css';

const StoryTileOneSkeleton = () => {
  return (
    <div className='story-tile-skeleton'>
      <div className='skeleton-style1-content'>
        <div className='skeleton-style1-author-container shimmer'></div>
        <div className='skeleton-style1-story-title-container shimmer'></div>
      </div>
    </div>
  );
}

export default StoryTileOneSkeleton;


