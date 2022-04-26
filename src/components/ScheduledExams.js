import React from 'react';
import WrapperFooter from './util/WrapperFooter';
import WrapperHeader from './util/WrapperHeader';

class ScheduledExams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render = () => {
        return (
            <>
                <WrapperHeader 
                    heading='Scheduled Exams'
                />
                <div className='content-loaded'>
                    <div>
                        content here...
                    </div>
                </div>
                <WrapperFooter />
            </>
        );
    }
}

export default ScheduledExams;