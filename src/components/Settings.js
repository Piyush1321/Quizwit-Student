import React from 'react';
import { useEffect } from 'react';

import Flash from './services/Flash';

import './css/Settings.css';
import WrapperHeader from './util/WrapperHeader';
import WrapperFooter from './util/WrapperFooter';

function Settings() {

    const updatePerPageExams = () => {
        let el = document.getElementById('per-page-exams');
        let v = el.value;
        try {
            v = parseInt(v);
            if(v >= 1 && v <= 10) {
                localStorage.setItem('perPageExams', v);
                Flash.message('Render setting updated', 'bg-success');
            }
            else {
                Flash.message('Integer value required between 1 and 10 inclusive.', 'bg-danger');
            }
        } catch(e) {
            alert('Integer value required between 1 and 10 inclusive.');
        }
    }

    useEffect(() => {
        document.getElementById('route-overlay').style.display = 'none';
        let perPageExams = localStorage.getItem('perPageExams');
        if(perPageExams == null) {
            localStorage.setItem('perPageExams', 4);
            perPageExams = 4;
        }
        document.getElementById('per-page-exams').value = perPageExams;
    }, []);
    return (
        <>
            <WrapperHeader
                heading='Settings'
            />
            <div className='content-loaded'>
                <div className='settings'>
                    <div>
                        <h3 className='heading'>General</h3>
                    </div>
                    <div>
                        <h3 className='heading'>Render</h3>
                        <div className='input-block'>
                            <div className='input-floating'>
                                <input id='per-page-exams' type='number' max={10} min={4} defaultValue={4} required/>
                                <label className='gray'>Number of exams per page</label>
                            </div>
                        </div>
                        <div className='flex-row jc-e mt-5'>
                            <button className='btn btn-primary btn-small' onClick={updatePerPageExams}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <WrapperFooter />
        </>
    );
}

export default Settings;
