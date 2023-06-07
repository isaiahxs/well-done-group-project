import React, {useEffect} from 'react'

import MainPageBanner from '../MainPageBanner';
import TrendingBanner from '../TrendingBanner';
import MainPageContent from '../MainPageContent';
import './HomePage.css'

const HomePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>
      <div className='banner-cover'></div>
      <MainPageBanner/>
      <TrendingBanner/>
      <MainPageContent/>

    </div>

  )
}

export default HomePage