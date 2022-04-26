import React from 'react';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';
import Flash from './services/Flash';
import TimeToString from './services/TimeToString';
import Request from './services/Request';
import DateTime from './services/DateTime';
import Attempts from './Attempts';
import Loader from './util/Loader';

class Exams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attempts: [],
            exams: [],
            loadAttempts: true
        };
    }

    fetchExams = () => {
        let url = "http://localhost:8080/QuizWit/ViewAttempts";
        Request.get(url)
        .then((res) => {
            if(res.success) {
                // console.log(res);
                let details = res.exams;
                for(let i=0; i<details.length; i++) {
                    details[i]["serialNo"] = i + 1;
                    details[i].startTime = (new DateTime(parseInt(details[i].startTime))).convertToView();
                    details[i].endTime = (new DateTime(parseInt(details[i].endTime))).convertToView();
                    details[i]["attempts"] = details[i].givenAttempts + "/" + details[i].totalAttempts;
                }
                this.setState({
                    exams: details
                })
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }

    fetchAttempts = () => {
        let exams = document.getElementsByName('examId');
        let examTitles = document.getElementsByClassName('exam-title');
        let examId = null;
        for(let i=0; i<exams.length; i++) {
            if(exams[i].checked) {
                examId = exams[i].value;
                localStorage.setItem("ExamTitle", examTitles[i].innerText);
                break;
            }
        }
        if(examId) {
            this.setState({
                loadAttempts: false
            }, () => {
                let url = "http://localhost:8080/QuizWit/ViewAttempts?examId=";
                url += examId;
                Request.get(url)
                .then((res) => {
                    if(res.success) {
                        console.log(res);
                        let details = res.attempts;
                        for(let i=0; i<details.length; i++) {
                            details[i]["serialNo"] = i + 1;
                            if(details[i].examStartTime != '0')
                                details[i].examStartTime = (new DateTime(parseInt(details[i].examStartTime)*1000)).convertToView();
                            else details[i].examStartTime = '-';
                            if(details[i].examSubmitTime != '0')
                                details[i].examSubmitTime = (new DateTime(parseInt(details[i].examSubmitTime)*1000)).convertToView();
                            else details[i].examSubmitTime = '-';

                            let scored = details[i].scored;
                            let total = details[i].totalExamScore;
                            if(scored < 0)
                                details[i]["percentage"] = 0.00 + "%";
                            else details[i]["percentage"] = ((scored/total)*100).toFixed(2) + "%";
                        }
                        this.setState({
                            loadAttempts: true,
                            attempts: res.attempts
                        }, () => {
                            document.getElementById('attempts-dialog').style.display = 'block';
                            document.getElementById('route-overlay').style.display = 'block';
                        });
                    }
                    else {
                        Flash.message(res.error, 'bg-danger');
                    }
                })
            });
        }
        else {
            Flash.message('Select exam to view attempts', 'bg-primary');
        }
    }

    componentDidMount = () => {
        this.fetchExams();
    }

    render = () => {
        return (
            <>
                <WrapperHeader 
                    heading='Attempted Exams'
                    component={
                        <div className='flex-row ai-c'>
                            <button className='btn btn-secondary btn-small' onClick={this.fetchAttempts}>View Attempts</button>
                        </div>
                    }
                />
                <div className='content-loaded'>
                    <div>
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
                        {
                            !this.state.loadAttempts &&
                            <Loader />
                        }
                    </div>
                    {
                        this.state.loadAttempts &&
                        <Attempts 
                            attempts={this.state.attempts}
                            fetchAttempts={this.fetchAttempts}
                        />
                    }
                </div>       
                <WrapperFooter 
                    render={
                        <div className='tertiary flex-row jc-c ai-c' style={{width: "100%"}}>Select and click view to see all attempts of an exam.</div>
                    }
                />
            </>
        );
    }
}

export default Exams;