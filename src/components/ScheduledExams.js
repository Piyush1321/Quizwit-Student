import React from 'react';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';
import Flash from './services/Flash';
import Request from './services/Request';
import DateTime from './services/DateTime';
import Loader from './util/Loader';

class ScheduledExams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            loaded: false
        };
    }

    fetchExams = () => {
        let url = "http://localhost:8080/QuizWit/ScheduledExam";
        Request.get(url)
        .then((res) => {
            if(res.success) {
                let details = res.exams;
                for(let i=0; i<details.length; i++) {
                    details[i]["serialNo"] = i + 1;
                    details[i].startTime = (new DateTime(parseInt(details[i].startTime))).convertToView();
                    details[i].endTime = (new DateTime(parseInt(details[i].endTime))).convertToView();
                    details[i]["attempts"] = details[i].numberOfAttempts;
                }
                this.setState({
                    exams: details,
                    loaded: true
                })
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }

    takeExam = () => {
        let exams = document.getElementsByName('examId');
        let examTitles = document.getElementsByClassName('exam-title');
        let examId = null;
        for(let i=0; i<exams.length; i++) {
            if(exams[i].checked) {
                examId = exams[i].value;
                break;
            }
        }
        if(examId) {
            let a = document.createElement('a');
            a.href = 'http://localhost:3002/' + examId;
            a.target = '_blank';
            a.click();
        }
        else {
            Flash.message('Select an exam', 'bg-primary');
        }
    }

    componentDidMount = () => {
        this.fetchExams();
    }

    render = () => {
        return (
            <>
                <WrapperHeader 
                    heading='Scheduled Exams'
                    component={
                        <div className='flex-row ai-c'>
                            {
                                this.state.exams.length > 0 &&
                                <button className='btn btn-secondary btn-small' onClick={this.takeExam}>Take Exam</button>
                            }
                        </div>
                    }
                />
                <div className='content-loaded'>
                    <div>
                        {
                            this.state.loaded && this.state.exams.length == 0 &&
                            <div className='danger'>Currently no exam is scheduled for you.</div>
                        }
                        {
                            this.state.loaded && this.state.exams.length > 0 &&
                            
                            <div className="table-container mt-10">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{width: "40px"}}></th>
                                            <th className='text-left' style={{width: "50px"}}>S No.</th>
                                            <th className='text-left' style={{width: "300px"}}>Title</th>
                                            <th className='text-left' style={{width: "180px"}}>Start Time</th>
                                            <th className='text-left' style={{width: "180px"}}>End Time</th>
                                            <th className='text-center'>Attempts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.exams.map((d, k) => {
                                                return <tr key={k}>
                                                    <td className='text-center'>
                                                        <div className='flex-row jc-c ai-c'>
                                                            <label className='custom-radio'>
                                                                <input type="radio" name="examId" value={d.examId}/>
                                                                <span>
                                                                <i className='fas fa-check'></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>{d.serialNo}</td>
                                                    <td className='text-left exam-title'>{d.title}</td>
                                                    <td className='text-left'>{d.startTime}</td>
                                                    <td className='text-left'>{d.endTime}</td>
                                                    <td className='text-center' style={{width: "150px"}}>{d.attempts}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                        {
                            !this.state.loaded &&
                            <Loader />
                        }
                    </div>
                </div>
                <WrapperFooter />
            </>
        );
    }
}

export default ScheduledExams;