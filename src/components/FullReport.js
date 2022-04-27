import React from 'react';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';
import Flash from './services/Flash';
import TimeToString from './services/TimeToString';
import Request from './services/Request';
import DateTime from './services/DateTime';
import Attempts from './Attempts';
import Loader from './util/Loader';
import DashboardCard from './util/DashboardCard';
import Section from './util/Section';
import Highcharts from 'highcharts';

class FullReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attemptId: localStorage.getItem('AttemptId'),
            loaded: false,
            result: {},
            sections: []
        };
    }

    fetchReport = () => {
        let url = "http://localhost:8080/QuizWit/AttemptReport?attemptId=" + this.state.attemptId;
        Request.get(url)
        .then((res) => {
            if(res.success) {
                console.log(res);
                let scored = res.result.scored;
                let total = res.result.totalExamScore;
                if(scored < 0)
                    res.result["percentage"] = 0.00 + "%";
                else res.result["percentage"] = ((scored/total)*100).toFixed(2) + "%";
                for(let i=0; i<res.result.sections.length; i++) {
                    let section = res.result.sections[i];
                    res.result.sections[i]["serialNo"] = i + 1;
                    let sectionScored = section.scored;
                    let totalSectionScore = section.totalSectionScore;
                    if(sectionScored < 0)
                        section["percentage"] = 0.00 + "%";
                    else section["percentage"] = ((sectionScored/totalSectionScore)*100).toFixed(2) + "%";
                    res.result.sections[i] = section;
                }
                this.setState({
                    result: res.result,
                    loaded: true,
                    sections: res.result.sections
                }, () => {
                    let correctQue = res.result.correctQuestions;
                    let incorrectQue = res.result.incorrectQuestions;
                    let unattemptedQue = res.result.totalQuestions - res.result.attemptedQuestions;
                    let totalQue = res.result.totalQuestions;
                    let data = [
                        {
                            name: 'Correct Questions',
                            y: (correctQue/totalQue)*100,
                            color: "rgb(102, 144, 105)"
                        },
                        {
                            name: 'Incorrect Questions',
                            y: (incorrectQue/totalQue)*100,
                            color: "rgb(184, 102, 102)"
                        },
                        {
                            name: 'Unattempted Questions',
                            y: (unattemptedQue/totalQue)*100,
                            color: "rgb(91, 138, 170)"
                        }
                    ]
                    this.examPieChart(data);
                })
            }
            else {
                Flash.message(res.error, 'bg-danger');
            }
        })
    }

    examPieChart = (data) => {
        console.log(data);
        Highcharts.chart('exam-pie-chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Exam Statistics'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                colorByPoint: true,
                data: data
            }]
        });
    }

    componentDidMount = () => {
        this.fetchReport();
    }

    render = () => {
        return (
            <>
                <WrapperHeader 
                    heading='Full Report'
                    component={
                        <div className='flex-row ai-c'>
                        </div>
                    }
                />
                <div className='content-loaded'>
                    <div>
                        <h2 className='mb-5 secondary' style={{fontWeight: 5}}>{this.state.result.examTitle}</h2>
                        {
                            this.state.loaded && 
                            <>
                            <div className='dashboard-card-container pt-10'>
                                <DashboardCard title="Total Questions" value={this.state.result.totalQuestions} icon="fas fa-check" color="linear-gradient(45deg,rgb(91, 138, 170), rgb(63 155 218))" />
                                <DashboardCard title="Attempted Questions" value={this.state.result.attemptedQuestions} icon="fas fa-check" color="linear-gradient(45deg, rgb(195, 83, 126),rgb(226 54 120))" />
                                <DashboardCard title="Correct Questions" value={this.state.result.correctQuestions} icon="fas fa-calendar" color="linear-gradient(45deg, rgb(102, 144, 105), rgb(88 180 95))"/>
                                <DashboardCard title="Incorrect Questions" value={this.state.result.incorrectQuestions} icon="fas fa-calendar" color="linear-gradient(45deg, rgb(184, 102, 102), rgb(230 76 76))"/>
                            </div>
                            <div className='flex-row mb-10'>
                                <div className='flex-full' id='exam-pie-chart'></div>
                                <div className='flex-full'>
                                    <div className='statistics-block'>
                                        <div>Total Score</div>
                                        <div>{this.state.result.totalExamScore}</div>
                                    </div>
                                    <div className='statistics-block'>
                                        <div>Your Score</div>
                                        <div>{this.state.result.scored}</div>
                                    </div>
                                    <div className='statistics-block'>
                                        <div>Your Percentage</div>
                                        <div>{this.state.result.percentage}</div>
                                    </div>
                                </div>
                            </div>
                            <h3 className='secondary mb-10'>Sections</h3>
                            <div className='mb-20'>
                                <div className='table-container'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='text-left'>S No.</th>
                                                <th className='text-left' style={{width: "300px"}}>Title</th>
                                                <th>Questions</th>
                                                <th>Attempted</th>
                                                <th>Correct</th>
                                                <th>Incorrect</th>
                                                <th>Score</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.sections.map((d, k) => {
                                                    return <tr key={k}>
                                                        <td className='text-left'>{d.serialNo}</td>
                                                        <td className='text-left'>{d.title}</td>
                                                        <td className='text-center'>{d.totalSectionQuestions}</td>
                                                        <td className='text-center'>{d.attemptedSectionQuestions}</td>
                                                        <td className='text-center'>{d.correctSectionQuestions}</td>
                                                        <td className='text-center'>{d.incorrectSectionQuestions}</td>
                                                        <td className='text-center'>{d.scored}/{d.totalSectionScore}</td>
                                                        <td className='text-center'>{d.percentage}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <h3 className='secondary mb-10'>Questions</h3>
                            <div>
                                {
                                    this.state.sections.map((d, k) => {
                                        return <Section 
                                            key={k}
                                            section={d}
                                        />
                                    })
                                }
                            </div>
                            </>
                        }
                        {
                            !this.state.loaded &&
                            <Loader />
                        }
                        <div className='pb-10'></div>
                    </div>
                </div>       
                <WrapperFooter 
                />
            </>
        );
    }
}

export default FullReport;