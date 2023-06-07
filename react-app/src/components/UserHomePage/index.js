import React, {useEffect} from 'react'
import './UserHomePage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, NavLink } from 'react-router-dom';



const UserHomePage = () => {
  const history = useHistory()
  const user = useSelector(state=>state.session.user)

  useEffect(()=>{
    if(!user){
      history.push('/')
    }
  },[user])

  return (
    <div>UserHomePage</div>
  )
}
export default UserHomePage