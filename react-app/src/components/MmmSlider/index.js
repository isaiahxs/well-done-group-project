import React from 'react';
import './MmmSlider.css';
import MTile from '../MTile';

const MmmSlider = ({ length }) => {
  return (
    <div className='mmm-slider'>
      {Array.from({ length }, (_, i) => (
        <MTile key={i} />
      ))}
    </div>
  );
};

export default MmmSlider;
