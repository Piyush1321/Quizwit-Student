import React from 'react';
import { useState } from 'react';
import NavLinkCustom from '../util/NavLinkCustom';
import '../css/Navbar.css'

function Navbar() {


    return (
        <>
            <div className='navbar-container'>
                <div id="navbar" className='navbar'>
                    <div id="navbar-link-container" className='links'>
                        <NavLinkCustom 
                            description='Dashboard'
                            route='/'
                            icon='fas fa-tachometer-alt'
                        />
                        <div className='link-section'>Exam</div>
                        <NavLinkCustom 
                            description='Scheduled Exams'
                            route='/scheduled-exams'
                            icon='fas fa-calendar'
                            id='view-scheduled-exam-nav-link'
                        />
                        <NavLinkCustom 
                            description='Attempted Exams'
                            route='/attempted-exams'
                            icon='fas fa-box'
                            id='view-attempt-nav-link'
                        />
                        <div className='link-section'>General</div>
                        <NavLinkCustom 
                            description='Settings'
                            route='/settings'
                            icon='fas fa-cog'
                        />
                        {/* <NavLinkCustom 
                            description='Program Editor'
                            route='/ace-editor'
                            icon='fas fa-code'
                        />
                        <NavLinkCustom 
                            description='Question Editor'
                            route='/react-editor'
                            icon='fas fa-question'
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
