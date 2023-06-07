import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './SidePanel.css';
import { WindowContext } from '../../context/WindowContext';
import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';


const SidePanel = () => {
  return (
    <div>SidePanel</div>
  )
}
export default SidePanel