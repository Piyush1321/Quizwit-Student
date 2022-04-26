import React from 'react';
import { NavLink } from 'react-router-dom'

function NavLinkCustom(props) {
  return (
    <NavLink to={props.route} className='inactive' id={props.id}>
        <div>
            <i className={props.icon}></i>
        </div>
        <div>{props.description}</div>
    </NavLink>
  );
}

export default NavLinkCustom;
