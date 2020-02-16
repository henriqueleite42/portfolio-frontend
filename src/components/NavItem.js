// External Imports
import React from 'react';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import '../styles/components/NavItem.scss';

// Functions
import { getLink, redirect } from '../functions';

// Render
const NavItem = ({ link, name, icon, subItem }) => {
  const getClass = () => {
    let className = "nav-item";
    let actualLink = getLink();

    if (subItem) {
      className += " sub-item";

      if (actualLink[0] === link[0] && ((name === "All" && (!actualLink[1])) || actualLink[1] === link[1])) {
        className += " active";
      }
    } else if (actualLink[0] === link[0]) {
      className += " active";
    }

    return className;
  }

  return (
    <li
      className={ getClass() }
      onClick={ () => redirect(link) }
    >
      { icon && <FontAwesomeIcon className="nav-icon" icon={ icon }/> }
      <span className="nav-span">{ name }</span>
    </li>
  );
}

export default NavItem;