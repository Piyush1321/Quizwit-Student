import React from 'react';
import '../css/WrapperFooter.css';

function WrapperFooter(props) {
  return (
    <div className='wrapper-footer'>
      {props.render}
    </div>
  )
}

export default WrapperFooter;