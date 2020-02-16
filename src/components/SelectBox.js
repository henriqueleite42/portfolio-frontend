// External Import
import React, { useState } from 'react';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import '../styles/components/SelectBox.scss';

// Render
const SelectBox = ({ id,name, options, multi }) => {
  const [ open, setOpen ] = useState(false);
  const [ info, setInfo ] = useState({
    name: name,
    value: []
  });

  const handleChange = e => {
    let newInfo = Object.assign({}, info);

    if (multi) {
      if (newInfo.value.includes(e.target.getAttribute('value'))) {
        newInfo.value.splice(newInfo.value.indexOf(e.target.getAttribute('value')), 1);
      } else {
        newInfo.value.push(e.target.getAttribute('value'));
      }

      if (newInfo.value.length < 1) {
        newInfo.name = name;
      } else {
        newInfo.name = newInfo.value.length + ' Selected';
      }
    } else {
      setOpen(false);

      newInfo = {
        name: [e.target.innerText],
        value: [e.target.getAttribute('value')]
      }
    }

    setInfo(newInfo);
  }

  return (
    <div className="select-main">
      <input id={ id } type="hidden" value={ info.value }/>
      <div className="select-selector" onClick={ () => setOpen(!open) }>
        <span className="select-value">{ info.name }</span>
        <span className="select-arrow">
          <FontAwesomeIcon icon={ open ? "caret-up" : "caret-down" }/>
        </span>
      </div>
      <ul className={ "select-select" + (open ? " open" : "") }>
        { multi ||
          <li
            value=""
            className="select-option"
            onClick={ handleChange }
          >
            { name }
          </li>
        }
        {
          options.map((item, index) => {
            return (
              <li
                key={ index }
                value={ item.value }
                className={ "select-option" + (info.value.includes(item.value) ? " selected" : "") }
                onClick={ handleChange }
              >
                { item.name }
                { (multi && info.value.includes(item.value)) &&
                  <FontAwesomeIcon icon="check"/>
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default SelectBox;