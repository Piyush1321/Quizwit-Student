import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './css/Input.css';
import Request from './components/services/Request';
import Flash from './components/services/Flash';

import Header from './components/includes/Header';
import Navbar from './components/includes/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/includes/Footer';
import Settings from './components/Settings';
import Signin from './components/Signin';
import ChangePasswordDialog from './components/includes/ChangePasswordDialog';
import Profile from './components/Profile';
import ScheduledExams from './components/ScheduledExams';
import Exams from './components/Exams';
import FullReport from './components/FullReport';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      student: {},
      changePassword: false,

    }
  }

  setLogin = (value) => {
    this.setState({
      login: value
    });
  }

  setStudent = (details) => {
    this.setState({
      student: details
    });
  }

  setChangePassword = (value) => {
    this.setState({
      changePassword: value
    });
  }
  logout = () => {
    let url = "http://localhost:8080/QuizWit/Logout?user=3";
    Request.get(url)
    .then((res) => {
        if(res.success) {
            this.setLogin(false);
            Flash.message(res.success, 'bg-success');
        }
        else {
            Flash.message(res.error, 'bg-danger');
        }
    })
  }
  componentDidMount = () => {
    let url = 'http://localhost:8080/QuizWit/LoginStudent';
    let data = {};
    Request.post(url, data)
    .then((res) => {
      // console.log(res);
        if(res.success) {
            this.setStudent(res.details);
            this.setLogin(true);
        }
    })
  }

  render = () => {
    return (
      <div className='fix-wrapper'>
          <Router>
            {
              this.state.login &&
              <>
                <Header 
                  setLogin={this.setLogin}
                  student={this.state.student}
                  changePassword={this.setChangePassword}
                />
                <div className='body-wrapper'>
                  <Navbar />
                  <div className='main-wrapper'>
                    <div className='route-loader'>

                      <Routes>
                        <Route path='/' element={<Dashboard />} setLogin={this.setLogin}/>
                        <Route path='/scheduled-exams' element={<ScheduledExams logout={this.logout}/>} />
                        <Route path='/attempted-exams' element={<Exams />} />
                        <Route path='/full-report' element={<FullReport />} />
                        
                      </Routes>
                      
                      <div id='route-overlay'></div>
                      {
                        this.state.changePassword &&
                        <ChangePasswordDialog 
                          changePassword={this.setChangePassword}
                          setLogin={this.setLogin}
                        />
                      }
                    </div>
                  </div>
                </div>
                <Footer />
              </>
            }
            {
              !this.state.login &&
              <Signin 
                setLogin={this.setLogin}
                setStudent={this.setStudent}
              />}
          </Router>
      </div>
    );
  }
}

export default App;
