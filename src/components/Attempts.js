import React from 'react';
import '../components/css/Attempts.css';
import Flash from './services/Flash';
import Request from './services/Request';
import TimeToString from './services/TimeToString';

class Attempts extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.attempts);
        this.state = {
            attempts: this.props.attempts,
            examTitle: localStorage.getItem("ExamTitle")
        }
    }
    closeDialog = () => {
        document.getElementById('attempts-dialog').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }
    viewFullReport = () => {

    }
    componentDidMount = () => {

    }
    render() {
        return (
            <>
                <div id='attempts-dialog'>
                    <div style={{height: "100%"}}>
                        <div className='flex-col flex-full jc-sb'>
                            <h3 className='secondary mb-10 flex-row jc-sb' id='exam-name-section-reference'>
                                <div>
                                    <span className='secondary'>{this.state.examTitle} </span>
                                    <span className='gray'> &gt; </span>
                                    <span className='primary'>Attempts</span>
                                </div>
                                <div>
                                    <i className='fas fa-sync bg-refresh-icon' onClick={this.props.fetchAttempts}></i>
                                </div>
                            </h3>
                            {
                                this.props.attempts.length != 0 ? 
                                <>
                                    <div className="table-container">
                                        <table className='mt-10'>
                                        <thead>
                                            <tr>
                                                <th style={{width: "40px"}}></th>
                                                <th style={{width: "40px"}}>S No.</th>
                                                <th className='text-left'>Start Time</th>
                                                <th className='text-left'>End Time</th>
                                                <th>Total Questions</th>
                                                <th>Attempted</th>
                                                <th>Correct</th>
                                                <th>Incorrect</th>
                                                <th className='text-center' style={{width: "80px"}}>Score</th>
                                                <th className='text-center' style={{width: "80px"}}>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.attempts.map((d, k) => {
                                                    return (<tr key={k}>
                                                            <td>
                                                                <div className='flex-row jc-c ai-c'>
                                                                    <label className='custom-radio'>
                                                                        <input type="radio" name="attemptId" value={d.attemptId}/>
                                                                        <span>
                                                                        <i className='fas fa-check'></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>{d.serialNo}</td>
                                                            <td className='text-left'>{d.examStartTime}</td>
                                                            <td className='text-left'>{d.examSubmitTime}</td>
                                                            <td style={{width: "80px"}} className='text-center'>{d.totalQuestions}</td>
                                                            <td style={{width: "80px"}} className='text-center'>{d.attemptedQuestions}</td>
                                                            <td style={{width: "80px"}} className='text-center'>{d.correctQuestions}</td>
                                                            <td style={{width: "80px"}} className='text-center'>{d.incorrectQuestions}</td>
                                                            <td className='text-center'>{d.scored + "/" + d.totalExamScore}</td>
                                                            <td className='text-center'>{d.percentage}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        </table>
                                    </div>
                                </>
                                : ''
                            }
                        </div>
                        <div className='flex-row jc-sb'>
                            <button className='btn btn-fade btn-small' onClick={this.closeDialog}>Close</button>
                            <button className='btn btn-primary btn-small' onClick={this.viewFullReport}>View Full Report</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Attempts;