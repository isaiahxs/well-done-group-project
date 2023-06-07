import React, {useEffect} from 'react'
import { useHistory, useLocation, NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MainPageBanner from '../MainPageBanner';
import TrendingBanner from '../TrendingBanner';
import MainPageContent from '../MainPageContent';
import './HomePage.css'

const HomePage = () => {

  const history = useHistory()
  const user = useSelector(state=>state.session.user)


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(user){
    history.push('/home')
  }

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