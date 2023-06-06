import React, {useEffect} from 'react'
import { useHistory, useLocation, NavLink } from 'react-router-dom';

import MainPageBanner from '../MainPageBanner';
import TrendingBanner from '../TrendingBanner';
import MainPageContent from '../MainPageContent';
import './HomePage.css'

const HomePage = () => {

  const history = useHistory()

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