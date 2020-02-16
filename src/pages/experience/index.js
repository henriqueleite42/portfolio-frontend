// External Imports
import React from 'react';

// Components
import Experience from './Experience';
import InDev from '../InDev';

// Functions
import { getLink } from '../../functions';

// Render
const index = () => {
  const link = getLink();
  let page = <Experience/>;

  if (link.length > 1) {
    switch (link[1]) {
      default:
        page = <InDev/>;
        break;
    }
  }

  return page;
}

export default index;