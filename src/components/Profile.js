import React from 'react';
import Flash from './services/Flash';
import Request from './services/Request';
import $ from 'jquery';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminDetails: {},
            success: false
        }
    }

    fetchProfile = () => {
        let url = 'http://localhost:8080/QuizWit/ViewAdminProfile';
        Request.get(url)
        .then((res) => {
            if(res.success) {
                this.setState({
                    adminDetails: res.adminDetails,
                    success: true
                }, () => {
                    console.log(this.state.adminDetails);
                })
            }
        })
    }

    componentDidMount = () => {
        this.fetchProfile();
        document.getElementById('route-overlay').style.display = 'none';
    }

    render = () => {
        return (
            <>
               <WrapperHeader 
                    heading={'Profile'}
                />
                <div className='content-loaded'>
                    <div>
                        {
                            !this.state.success && 
                            <div className='danger'>Only Administrator can view their profile.</div>
                        }
                        {
                            this.state.success && 
                            <form>
                                <div className="input-block">
                                    <div className="input-custom">
                                        <input type="text" name="fullname" defaultValue={this.state.adminDetails.fullName} disabled/>
                                        <label>Full Name</label>
                                        <div className="response"></div>
                                    </div>
                                    <div className="input-custom">
                                        <input type="text" name="contact" defaultValue={this.state.adminDetails.contact} disabled/>
                                        <label>Contact</label>
                                        <div className="response"></div>
                                    </div>
                                </div>
    
                                <div className="input-block">
                                    <div className="input-custom">
                                        <input type="email" name="email" defaultValue={this.state.adminDetails.email} disabled/>
                                        <label>E-mail</label>
                                        <div className="response"></div>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
               <WrapperFooter 
               
               />
            </>
        )
    }
}

export default Profile;