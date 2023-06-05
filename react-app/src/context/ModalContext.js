import React, { createContext, useEffect, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {

  const [modal, setModal] = useState(null);
  const [needsRerender, setNeedsRerender] = useState(false);

  const [updateObj, setUpdateObj] = useState(null);
  

  const openModal = (modalType) => {
    setModal(modalType);
  };



  const closeModal = () => {
    setModal(null);
  };

  const render = () => {
    setNeedsRerender(true)
  }


  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, render, needsRerender, setNeedsRerender, updateObj, setUpdateObj }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
 

