// External Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Header from '../../components/Header';
import ProjectItem from '../../components/ProjectItem';
import Paginate from '../../components/Paginate';

// Functions
import { makePath, getYear, addLoading, removeLoading } from '../../functions';

// Style
import '../../styles/pages/Projects.scss';

// Render
const Projects = ({ category }) => {
  const [ projects, setProjects ] = useState([]);
  const [ skills, setSkills ] = useState([]);
  const [ pagination, setPagination ] = useState({
    page: 1,
    total: 1
  });

  useEffect(() => {
    addLoading();

    axios.get(
      makePath(['project', 'search'], true) +
      '?mode=list' +
      (category ? ('&category=' + category) : '')
    )
    .then(res => {
      removeLoading();

      let newPagination = Object.assign({}, pagination);
      newPagination.total = (res.data.total || 1);
      setPagination(newPagination);

      setProjects(res.data.data);
    })
    .catch(e => removeLoading());

    axios.get(makePath(['skill', 'search'], true))
    .then(res => {
      let newSkills = [];

      res.data.data.forEach(item => {
        newSkills.push({
          value: item._id,
          name: item.name
        })
      });

      setSkills(newSkills);
    })
    .catch(e => removeLoading());
  }, []);

  const selects = [
    {
      id: "filter-skills",
      name: "Skills",
      options: skills,
      multi: true
    },
    {
      id: "filter-creation",
      name: "Creation",
      options: []
    },
    {
      id: "filter-difficulty",
      name: "Difficulty",
      options: [
      {
        value: 'easy',
        name: 'Easy'
      },
      {
        value: 'normal',
        name: 'Normal',
      },
      {
        value: 'hard',
        name: 'Hard'
      }
    ]}
  ];

  for (let year = 2019; year <= getYear(); year++) {
    selects[1].options.push({
      value: year,
      name: year
    });
  }

  const changePage = page => {
    addLoading();
    let filters = [];

    if (document.getElementById('filter-skills')) {
      let skills = document.getElementById('filter-skills').value;
      let creation = document.getElementById('filter-creation').value;
      let difficulty = document.getElementById('filter-difficulty').value;
      let name = document.getElementById('search-bar').value;

      if (skills.length > 0) filters.push('skills='+skills);
      if (creation.length > 0) filters.push('creation='+creation);
      if (difficulty.length > 0) filters.push('difficulty='+difficulty);
      if (name.length > 0) filters.push('name='+name);
    }

    axios.get(makePath(['project', 'search'], true) + '?mode=list&page=' + page + '&' + filters.join('&'))
    .then(res => {
      removeLoading();

      let newPagination = Object.assign({}, pagination);
      newPagination.total = (res.data.total || 1);
      newPagination.page = (res.data.page || 1);
      setPagination(newPagination);

      setProjects(res.data.data);

      document.getElementById('half-right').scrollTo(0, 0)
    });
  }

  return (
    <div>
      <Header
        name="Projects"
        searchBar={ true }
        filters={ selects }
        onSearch={ () => changePage(1) }
      />
      <Paginate
        active={ pagination.page }
        total={ pagination.total }
        change={ changePage }
      />
      <div id="body-projects">
        {
          projects.map((item, index) =>
            <ProjectItem
              key={ index }
              img={ item.img }
              name={ item.name }
              link={ item.link }
              creation={ item.creation }
              skills={ item.skills }
              difficulty={ item.difficulty }
            />
          )
        }
      </div>
      <Paginate
        active={ pagination.page }
        total={ pagination.total }
        change={ changePage }
      />
    </div>
  );
}

export default Projects;