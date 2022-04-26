import React from 'react';
import '../css/ChangePasswordDialog.css';
import Flash from '../services/Flash';
import Request from '../services/Request';
import $ from 'jquery';

class ChangePasswordDialog extends React.Component {
    constructor(props) {
        super(props);

    }


    logout = () => {
        let url = "http://localhost:8080/QuizWit/Logout?user=1";
        Request.get(url)
        .then((res) => {
            if(res.success) {
                this.props.setLogin(false);
                this.props.changePassword(false);
                Flash.message('Password changed successfully', 'bg-success');
                localStorage.setItem('quizwitAdminEmail', '');
                localStorage.setItem('quizwitAdminPassword', '');
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }

    changePassword = (e) => {
        e.preventDefault()
        console.log('submited');

        let url = "http://localhost:8080/QuizWit/ChangePasswordAdmin";
        let data = $('#change-password-form').serialize();
        Request.post(url, data)
        .then((res) => {
            console.log(res);
            if(res.sessionTimeout) {
                this.props.setLogin(false);
                this.props.changePassword(false);
                Flash.message('Session Timeout', 'bg-primary');
            }
            this.populateResponse(res);
        })
    }


    populateResponse = (res) => {
        let responseBlock = document.getElementById('change-password-form').getElementsByClassName('response');
        if(res.error) {
            Flash.message(res.error, 'bg-danger');
        }
        if(res.success) {
            this.logout();
        }
        else {
            let log = res.errorLog;
            let icon = '<i class="fas fa-exclamation-circle mr-5"></i>';
            responseBlock[0].innerHTML = (log.oldPassword ? icon + log.oldPassword : '');
            responseBlock[1].innerHTML = (log.newPassword ? icon + log.newPassword : '');
            responseBlock[2].innerHTML = (log.confirmPassword ? icon + log.confirmPassword: '');
        }
    }
    hideDialog = () => {
        document.getElementById('route-overlay').style.display = 'none';
        this.props.changePassword(false);
    }

    render = () => {
        return (
            <>
                <div id='change-password-dialog'>
                    <div>
                        <h3 className='mb-20 primary'>Change Password</h3>
                        <form id="change-password-form" action=""onSubmit={this.changePassword}>
                            <div className="input-block">
                                <div className="input-floating">
                                    <input type="password" name="oldPassword" defaultValue='' required />
                                    <label>Old Password</label>
                                    <div className='response'></div>
                                </div>
                            </div>
                            <div className="input-block">
                                <div className="input-floating">
                                    <input type="password" name="newPassword" defaultValue='' required />
                                    <label>New Password</label>
                                    <div className='response'></div>
                                </div>
                            </div>
                            <div className="input-block">
                                <div className="input-floating">
                                    <input type="password" name="newConfirmPassword" defaultValue='' required />
                                    <label>Confirm New Password</label>
                                    <div className='response'></div>
                                </div>
                            </div>
                            <div className='flex-row jc-sb'>
                                <div className='btn btn-fade btn-small' onClick={this.hideDialog}>Cancel</div>
                                <button className='btn btn-small btn-primary'>Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default ChangePasswordDialog;