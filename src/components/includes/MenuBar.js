import React from 'react';
import { Link } from 'react-router-dom';
import Request from '../services/Request';

import '../css/menubar.css'
import MenuLink from '../util/MenuLink';
import Flash from '../services/Flash';

function MenuBar(props) {
    const changePassword = () => {
        document.getElementById('route-overlay').style.display = 'block';
        props.changePassword(true);
    }
    const logout = () => {
        let url = "http://localhost:8080/QuizWit/Logout?user=3";
        Request.get(url)
        .then((res) => {
            if(res.success) {
                props.setLogin(false);
                Flash.message(res.success, 'bg-success');
                localStorage.setItem('quizwitAdminEmail', '');
                localStorage.setItem('quizwitAdminPassword', '');
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }

    return (
        <div id="menubar" className='menubar'>
            <p className='primary' >Logged in as <br/> <span style={{fontWeight: "bold"}}>{props.userType}</span></p>
            <div className='links'>
                <MenuLink 
                route='/profile'
                description='Profile'
                icon='fas fa-user-circle'
                class=''
                />
                <MenuLink 
                route='/backup'
                description='Backup'
                icon='fas fa-sync-alt'
                class=''
                />
                <div onClick={changePassword}>
                    <div>
                        <i className='fas fa-lock'></i>
                    </div>
                    <div>Change Password</div>
                </div>
                <div onClick={logout}>
                    <div>
                        <i className='fas fa-sign-out-alt'></i>
                    </div>
                    <div >Logout</div>
                </div>
            </div>
        </div>
    );
}

export default MenuBar;
