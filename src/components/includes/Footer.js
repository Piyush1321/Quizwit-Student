import React from 'react';
import { useState, useEffect } from 'react';
import '../css/Footer.css'

function Footer() {
  const [toggle, setToggle] = useState(1);

  const toggleDivHorizontal = (id, t, openWidth, closeWidth) => {
    let el = document.getElementById(id);
    let width = t ? openWidth : closeWidth;
    el.style.transition = "all 800ms";
    el.style.width = width + 'px';
  }

  const linkSectionToggle = () => {
    let style = document.createElement('style');
    if(!toggle) {
      style.innerText = '.link-section{color: white;}';
    }
    else {
      style.innerText = '.link-section{color: rgb(0, 0, 0, 0.3);}';
    }
    document.head.appendChild(style);
  }

  const updateNavbarStatus = () => {
    let status = toggle ? 'true' : 'false';
    localStorage.setItem('adminNavbarStatus', status);
  }

  const toggleNavbar = () => {
    setToggle(!toggle);
  }
  useEffect(() => {
    let status = localStorage.getItem('adminNavbarStatus');
    if(status != null) {
      status = status === 'true' ? 1 : 0;
      setToggle(status);
    }
  }, []);
  useEffect(() => {
    updateNavbarStatus();
    toggleDivHorizontal('navbar', toggle, 250, 50)
    linkSectionToggle();
  }, [toggle]);
  return (
    <>
      <div className='main-footer-container'>
        <div className='navbar-toggle-btn' onClick={toggleNavbar}>
            <i className='fas fa-bars'></i>
        </div>
        <div className='main-footer'>
            &copy; 2022-2022 QuizWit All rights reserved. 
        </div>
      </div>
    </>
  );
}

export default Footer;
