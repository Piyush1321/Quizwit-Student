import React from 'react';
import ReactMarkdown from 'react-markdown';

class Question extends React.Component {

    constructor(props) {
        super(props);
        let categoryId = this.props.question.categoryId;

        if(categoryId == '1' || categoryId == '2') {
            let options = this.props.question.mcqOptions;
            let serial = 65;
            let correctOptions = this.props.question.correctOptions;
            let selectedOptions = this.props.question.selectedOptions;
            for(let i=0; i<options.length && i<26; i++) {
                options[i]["serial"] = String.fromCharCode(serial);
                serial += 1;
                let control = false;
                for(let j=0; j<correctOptions.length; j++) {
                    if(parseInt(options[i].optionId) == correctOptions[j]) {
                        options[i]["status"] = 'correct-answer';
                        control = true;
                        break;
                    }
                }
                if(!control) {
                    for(let k=0; k<selectedOptions.length; k++) {
                        if(parseInt(options[i].optionId) == selectedOptions[k]) {
                            options[i]["status"] = 'wrong-answer';
                            break;
                        }
                    }
                }
            }
            this.props.question.mcqOptions = options;
        }
        this.state = {
            data: this.props.question
        }
    }

    render = () => {
        return (
            <div className='question'>
                <div className='flex-row ai-s'>
                    <div style={{minWidth: "40px", marginTop: "4px"}}>{this.state.data.serialNo}</div>
                    <div><ReactMarkdown>{this.state.data.question}</ReactMarkdown></div>
                </div>
                <div className='flex-row'>
                    <div style={{minWidth: "40px"}}></div>
                    <div className='mt-10 flex-full'>
                        {
                            this.state.data.categoryId == '3' &&
                            <>
                                <div className='flex-row'>
                                    <div className={'true-false-block ' + (this.state.data.selectedAnswer == 'TRUE' && this.state.data.correctAnswer == 'TRUE' ? 'correct-answer' : ' ') + (this.state.data.selectedAnswer == 'TRUE' && this.state.data.correctAnswer == 'FALSE' ? 'wrong-answer' : ' ') + (this.state.data.correctAnswer == 'TRUE' ? 'correct-answer' : '')}>True</div>
                                    <div className={'true-false-block ' + (this.state.data.selectedAnswer == 'FALSE' && this.state.data.correctAnswer == 'FALSE' ? 'correct-answer' : ' ') + (this.state.data.selectedAnswer == 'FALSE' && this.state.data.correctAnswer == 'TRUE' ? 'wrong-answer' : ' ') + (this.state.data.correctAnswer == 'FALSE' ? 'correct-answer' : '')}>False</div>
                                </div>
                            </>

                        }
                        {
                            (this.state.data.categoryId == '1' || this.state.data.categoryId == '2') &&
                            <div className='flex-col'>
                                {
                                    this.state.data.mcqOptions.map((d, k) => {
                                        return <div key={k} className={'mcq-option flex-full ' + d.status}>
                                            <div style={{minWidth: "35px"}}>{d.serial}.</div>
                                            <div className='flex-full'>{d.option}</div>
                                        </div>
                                    })
                                }
                                
                            </div>
                        }

                    <div className='flex-row ai-c mt-5 fs-small'>
                        {
                            this.state.data.status.attempted == 0 &&
                            <div className='primary fs-small'><i className='fas fa-circle mr-5'></i> Unattempted</div>
                        }
                        {
                            this.state.data.status.attempted == 1 && this.state.data.status.correct == 1 &&
                            <div className='success fs-small'><i className='fas fa-check mr-5'></i> Correct</div>
                        }
                        {
                            this.state.data.status.attempted == 1 && this.state.data.status.correct == 0 &&
                            <div className='danger fs-small'><i className='fas fa-times mr-5'></i> Incorrect</div>
                        }
                        <div className='ml-10 mr-10'>Score: {this.state.data.score}</div>
                        <div className='mr-10'>Negative: {this.state.data.negative}</div>
                    </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Question;