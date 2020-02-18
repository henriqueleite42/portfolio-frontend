// External Imports
import React from 'react';
import axios from 'axios';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Functions
import { showError, makePath, addLoading, removeLoading, between } from '../functions';

// Style
import '../styles/pages/Contact.scss';

// Render
const Contact = () => {
  const submit = () => {
    addLoading();

    let name = document.getElementById('input-name').value;
    let company = document.getElementById('input-company').value;
    let msg = document.getElementById('input-msg').value;

    if (!between(name, 5, 25)) {
      showError('Name lenght must be beetween 5 and 25 characters');
      return;
    }

    if (!between(company, 3, 30)) {
      showError('Company lenght must be beetween 3 and 30 characters');
      return;
    }

    if (!between(msg, 50, 500)) {
      showError('Message lenght must be beetween 50 and 500 characters');
      return;
    }

    axios.post(makePath(['message', 'create'], true), {
      name,
      company,
      msg
    })
    .then(res => {
      removeLoading()
    })
    .catch(e => removeLoading())
  }

  return (
    <div id="contact-container">
      <div id="contact-main">
        <h1>Contact</h1>
        <div className="contact-row">
          <div id="contact-ways">
            <div className="contact-way">
              <FontAwesomeIcon icon="phone-square-alt"/>
              <span>+55 19 99990 4610</span>
            </div>
            <div className="contact-way">
              <FontAwesomeIcon icon="envelope"/>
              <span>henriqueleite616@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="contact-row" id="row-2">
          <div className="input-div">
            <input
              type="text"
              id="input-name"
              placeholder="Name"
              className="input-input"
            />
          </div>
          <div className="input-div">
            <input
              type="text"
              id="input-company"
              placeholder="Company"
              className="input-input"
            />
          </div>
          <div className="input-div">
            <textarea
              type="text"
              id="input-msg"
              placeholder="Message"
              className="input-input"
            />
          </div>
        </div>
        <div className="contact-row">
          <button onClick={ () => submit() }>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;