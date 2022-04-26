import React from 'react'
import { useEffect } from 'react';

function Loader(props) {
  return (
    <div className='loader-container'>
        <div className='loader'></div>
        <p className='mt-10 primary'>{props.value}</p>
    </div>
  )
}

export default Loader