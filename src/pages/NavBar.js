// External Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import NavItem from '../components/NavItem';
import NavFather from '../components/NavFather';

// Styles
import '../styles/pages/NavBar.scss';

// Functions
import { makePath, addLoading, removeLoading } from '../functions';

// Render
const NavBar = () => {
  const [ navBar, setNavBar ] = useState([]);

  useEffect(() => {
    addLoading();

    axios.get(makePath(['navbar', 'search'], true))
    .then(res => {
      removeLoading();
      setNavBar(res.data)
    });
  }, []);

  return (
    <nav id="nav-bar">
      <div id="nav-left">
        <div id="nav-menu">
          <h1>Menu</h1>
        </div>
        <ul id="nav-ul">
          { navBar &&
            navBar.map((item, index) => {
              if (item.subItens) {
                return (<NavFather
                  key={ index }
                  link={ item.link }
                  name={ item.name }
                  icon={ item.icon }
                  subItens={ item.subItens }
                />);
              } else {
                return (<NavItem
                  key={ index }
                  link={ item.link }
                  name={ item.name }
                  icon={ item.icon }
                />);
              }
            })
          }
        </ul>
      </div>
      <div id="nav-right"  onClick={ () => document.getElementById("App").classList += "hide" }></div>
    </nav>
  );
}

export default NavBar;