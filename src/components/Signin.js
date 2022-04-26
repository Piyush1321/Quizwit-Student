import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Request from './services/Request';
import Flash from './services/Flash';

import './css/Signin.css';

function Signin(props) {

    const resetForm = () => {
        document.getElementById('signin-form').reset();
    }

    const login = (e) => {
        e.preventDefault();
        let url = 'http://localhost:8080/QuizWit/LoginStudent';
        let data = $('#signin-form').serialize();

        Request.post(url, data)
        .then((res) => {
            // console.log(res)
            populateResponse(res);
            if(res.success) {
                props.setStudent(res.details);
                props.setLogin(true);
                // Flash.message(res.success, 'bg-success');
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }

    const populateResponse = (res) => {
        let responseBlock = document.getElementById('signin-form').getElementsByClassName('response');
        if(res.error) {
            Flash.message(res.error, 'bg-danger');
        }
        if(res.success) {
            resetForm();
        }
        else {
            let log = res.errorLog;
            let icon = '<i class="fas fa-exclamation-circle mr-5"></i>';
            responseBlock[0].innerHTML = (log.user ? icon + log.user: '');
            responseBlock[1].innerHTML = (log.email ? icon + log.email: '');
        }

    }

    return (
        <div className='signin-cover cover flex-row jc-c ai-c'>
            <div className='flex-full flex-col jc-c ai-c'>
                <form id='signin-form' className='form sign-in-form' onSubmit={login}>
                <div className='flex-row jc-c ai-c mb-20'>
                    <a href='http://localhost:3000'>
                        <img src='images/logo/logo.png' className='logo' alt='logo' />
                    </a>
                </div>
                <div className='header primary'>Sign In | Student</div>
                <div className='input-block ai-c'>
                    <div className='input-floating'>
                        <input id='admin-email' type='text' name='email' required/>
                        <label className='flex-row'>Email/Username</label>
                        <div className='response'></div>
                    </div>
                </div>
                <div className='input-block'>
                    <div className='input-floating'>
                        <input id='admin-password' type='password' name='password' required/>
                        <label>Password</label>
                        <div className='response'></div>
                    </div>
                </div>
                {/* <div className='input-block flex-row ai-e'>
                    <label className="custom-toggle-btn">
                        <input type="checkbox" id='remember-me' />
                        <span>
                            <i className="fas fa-check"></i>
                        </span>
                    </label> */}
                    {/* <p className='ml-10 gray'>Remember me</p> */}
                {/* </div> */}
                <div className='flex-row jc-sb mt-20'>
                    <div className='btn btn-fade btn-small' onClick={resetForm}>Reset</div>
                    <button id="admin-registration-btn" className='btn btn-primary btn-small'>Sign In</button>
                </div>
                <div className='footer'>
                    Create an account ? <a className='primary' href='http://localhost:3000/signup'>Sign Up</a>
                    <br />
                    <br />
                    <div className='primary cursor-p'>
                        <i className='fas fa-key mr-5'></i> Forgot password
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;
