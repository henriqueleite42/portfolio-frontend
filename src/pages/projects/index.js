// External Imports
import React from 'react';

// Components
import InDev from '../InDev';
import Projects from './Projects';

// Functions
import { getLink } from '../../functions';

// Render
const index = () => {
  const link = getLink();
  let page = <Projects/>;

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