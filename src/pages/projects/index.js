// External Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import InDev from '../InDev';
import Projects from './Projects';

// Functions
import { getLink, makePath, addLoading, removeLoading } from '../../functions';

// Render
const Index = () => {
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    addLoading();

    axios.get(makePath(['category', 'search'], true))
    .then(res => {
      removeLoading();

      const newCategories = {};

      for (let category of res.data.data) {
        newCategories[category.link] = category._id;
      }

      setCategories(newCategories);
    })
  }, []);

  const link = getLink();
  let page = <Projects/>;

  if (link.length[2]) {
    switch (link[1]) {
      default:
        page = <InDev/>;
        break;
    }
  } else if (link[1]) {
    if (categories[link[1]]) {
      page = <Projects category={ categories[link[1]] }/>;
    } else {
      page = <InDev/>;
    }
  }

  return page;
}

export default Index;