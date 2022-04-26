import React from 'react';
import '../css/WrapperHeader.css';
function WrapperHeader(props) {
  return (
    <div className='wrapper-header'>
      <div className='secondary description'>{props.heading}</div>
      <div>{props.component}</div>
    </div>
  )
}

export default WrapperHeader;