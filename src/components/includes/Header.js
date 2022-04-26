import React from 'react';
import { useState, useEffect } from 'react';
import '../css/Header.css'
import Timer from '../services/Timer';
import MenuBar from './MenuBar';
import Flash from '../services/Flash';
import Request from '../services/Request';

function Header(props) {

  const [toggle, setToggle] = useState(1);

  const toggleDivVertical = (id, t, openHeight, closeHeight) => {
    let el = document.getElementById(id);
    let height = t ? openHeight : closeHeight;
    el.style.transition = "all 700ms";
    el.style.height = height + 'px';
  } 
  const toggleMenubar = () => {
    setToggle(!toggle);
    toggleDivVertical('menubar', toggle, 250, 0);
  }

  const logout = () => {
    let url = "http://localhost:8080/QuizWit/Logout?user=1";
    Request.get(url)
    .then((res) => {
        if(res.success) {
            props.setLogin(false);
            Flash.message('Session Timeout', 'bg-success');
        }
        else {
            Flash.message(res.error, 'bg-danger');
        }
    })
  } 

  useEffect(() => {
    const timer = new Timer();
    let timePassed = props.student.currentTime - props.student.loginTime;
    timer.set(timePassed, 'login-timer', logout);
    timer.setCountUpLimit(3600);
    timer.start('COUNT_UP');
  }, []);  

  return (
      <div className='main-header'>
          <div className='flex-row jc-sb ai-c'>
            <div className='webapp'>
                <a href='http://localhost:3000'>
                    <img src='images/logo/logo.png' className='logo' />
                </a>
            </div>
            <div className='flex-row ai-c'>
                <div id='login-timer' className='mr-10' style={{fontSize: "14px"}} ></div>
                <div id="username">{props.student.fullName}</div>
                <div className='ml-10 mr-10'>|</div>
                <div className='userphoto-container' onClick={toggleMenubar}>
                    {
                      props.student.path && 
                      <img src='' alt='Profile photo' />
                    }
                    {
                      !props.student.path &&
                      <i className='fas fa-user-circle'></i>
                    }
                    <MenuBar 
                      setLogin={props.setLogin}
                      userType={props.student.userType}
                      changePassword={props.changePassword}
                    />
                </div>
            </div>
          </div>
      </div>
  );
}

export default Header;
