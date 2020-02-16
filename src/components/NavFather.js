// External Imports
import React, { useState } from 'react';

// Components
import NavItem from './NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Functions
import { getLink } from '../functions';

// Styles
import '../styles/components/NavFather.scss';

// Render
const NavFather = ({ link, name, icon, subItens }) => {
  const active = (getLink()[0] === link[0] ? true : false);

  const [ open, setOpen ] = useState(active);

  return (
    <li className={ "nav-father" + (active ? " active" : "") }>
      <div className="nav-text" onClick={ () => setOpen(!open) }>
        <div>
          { icon && <FontAwesomeIcon className="nav-icon" icon={ icon }/> }
          <span className="nav-span">{ name }</span>
        </div>
        <div className="nav-button">
          <FontAwesomeIcon className="nav-icon" icon={ (open ? "caret-up" : "caret-down") }/>
        </div>
      </div>
      { open &&
        <ul className={ "nav-list" + (open ? "" : " hide") }>
          {
            subItens.map((item, index) =>
              <NavItem
                key={ index }
                subItem={ true }
                link={ link.concat([item.link]) }
                name={ item.name }
              />
            )
          }
        </ul>
      }
    </li>
  );
}

export default NavFather;