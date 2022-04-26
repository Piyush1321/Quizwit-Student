import React from 'react'
import '../css/DashboardCard.css';
function DashboardCard(props) {
  return (
    <div className='dashboard-card' style={{"background": props.color}}>
        <div className='flex-row jc-sb'>
            <div>
                <div className='card-title'>{props.title}</div>
                <div className='card-value'>{props.value}</div>
                <div className='card-bar'></div>
            </div>
            <div>
                <i className={props.icon}></i>
            </div>
        </div>
        <div className='left-line'></div>
        <div className='circle-1'></div>
        <div className='circle-2'></div>
    </div>
  )
}

export default DashboardCard