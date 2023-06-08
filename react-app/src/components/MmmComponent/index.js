import React, { useContext } from 'react';

import './MmmComponent.css';
import MmmSlider from '../MmmSlider';
import { WindowContext } from '../../context/WindowContext';

const MmmComponent = () => {
  const { windowSize } = useContext(WindowContext);
  const isMobileView = windowSize <= 750;

  return (
    <>
      {!isMobileView && (
        <div className="mmm-container">
          <MmmSlider length={0} />
          <MmmSlider length={15} />
          <MmmSlider length={23} />
          <MmmSlider length={25} />
          <MmmSlider length={18} />
          <MmmSlider length={14} />
          <MmmSlider length={16} />
          <MmmSlider length={10} />
          <MmmSlider length={18} />
          <MmmSlider length={22} />
          <MmmSlider length={10} />
          <MmmSlider length={18} />
          <MmmSlider length={12} />
          <MmmSlider length={15} />
        </div>
      )}

      {isMobileView && <div className="mmm-container"></div>}
    </>
  );
};
export default MmmComponent;
