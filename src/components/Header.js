// External Imports
import React, { useState } from 'react';

// Components
import SelectBox from './SelectBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import '../styles/components/Header.scss';

// Render
const Header = ({ name, searchBar, subTitle, filters, onSearch }) => {
  const [ stateFilters, setStateFilters ] = useState(false);

  return (
    <div className="header-main">
      <div className="header-title">
        <h1>{ name }</h1>
        { subTitle && <h3>{ subTitle }</h3> }
      </div>
      { searchBar &&
        <div className={ "header-body" + (filters ? " include-filters" : "")}>
          <div className="search-bar">
            <input
              type="text"
              id="search-bar"
              placeholder="Search"
              className="search-input"
            />
            <FontAwesomeIcon
              className="search-icon"
              icon="search"
              onClick={ () => onSearch() }
            />
          </div>
          { filters &&
            <div
              className="show-filters"
              onClick= { () => setStateFilters(!stateFilters) }
            >
              <FontAwesomeIcon icon="filter"/>
            </div>
          }
        </div>
      }
      { (filters && stateFilters) &&
        <div className="filters">
        {
          filters.map((item, index) => {
            return (
              <SelectBox
                key={ index }
                name={ item.name }
                id ={ item.id }
                options={ item.options }
                multi={ item.multi }
              />
            );
          })
        }
        </div>
      }
    </div>
  );
}

export default Header;