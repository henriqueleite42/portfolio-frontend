// External Imports
import React from 'react';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Functions
import { redirect } from '../functions';

// Styles
import '../styles/components/ProjectItem.scss';

const ProjectItem = params => {
  const {
    img,
    name,
    link,
    creation,
    skills,
    difficulty,
  } = params;

  const getDifficulty = () => {
    let diff = difficulty;

    if (diff > 5) diff = (diff / 2);

    let star = Math.floor(diff);
    let half = ((star - diff) !== 0 ? (star + 1) : star);
    let result = [];

    for (let i = 0; i < star; i++) {
      result.push(<FontAwesomeIcon key={ i } icon="star"/>)
    }

    for (let i = star; i < half; i++) {
      result.push(<FontAwesomeIcon key={ i } icon="star-half"/>)
    }

    return result;
  }

  const getSkills = () => {
    let skl = [];

    skills.forEach((item, index) => skl.push(
      <div key={ index } className={ "tag "+item.tag }>{ item.name }</div>
    ))

    return skl;
  }

  const getRedirect = () => {
    if (link) return ["projects", link];
    else return [];
  }

  return (
    <div className="pi-main" onClick={ () => redirect(getRedirect()) }>
      <div className="pi-img">
        <img src={ img } alt={ name }/>
      </div>
      <div className="pi-body">
        <div className="pi-header">
          <span>{ name }</span>
        </div>
        <div className="pi-info">
          <div className="pi-first">
            <div className="pi-item pi-creation">
              <div>Created At:</div>
              <div>{ creation }</div>
            </div>
            <div className="pi-item pi-description">
              <div>Difficulty:</div>
              <div>{ getDifficulty() }</div>
            </div>
          </div>
          <div className="pi-item pi-language">
            <div>Skills:</div>
            <div>{ getSkills() }</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;