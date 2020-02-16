// External Import
import React from 'react';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import '../styles/pages/InDev.scss'

// Render
const InDev = () => {
  return (
    <div id="in-dev">
      <div id="gear-animation">
        <FontAwesomeIcon className="gear-big" icon="cog"/>
      </div>
      <span>Page in Development</span>
    </div>
  );
}

export default InDev;