import React from 'react';
import Question from './Question';

class Section extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        for(let i=0; i<this.props.section.questions.length; i++) {
            this.props.section.questions[i]["serialNo"] = i + 1;
        }
        this.state = {
            questions: this.props.section.questions
        }
    }

    render = () => {
        return (
            <div className='section'>
                <h3 className='flex-row primary'>
                    <div className='mr-10'>{this.props.section.serialNo}.</div>
                    <div>{this.props.section.title}</div>
                </h3>
                <div>
                    {
                        this.state.questions.map((d, k) => {
                            return <Question
                                key={k} 
                                question={d}
                            />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Section;