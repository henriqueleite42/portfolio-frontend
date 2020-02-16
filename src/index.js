import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Home from './pages/Home';
import NavBar from './pages/NavBar';
import Contact from './pages/Contact';
import Loading from './pages/Loading';
import Projects from './pages/projects';
import Experience from './pages/experience';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Functions
import { getLink } from './functions';

// Styles
import './styles/index.scss';

// Font Awesome
import './styles/config/fontawesome';

function App() {
  const page = () => {
    let link = getLink();

    switch (link[0]) {
      case 'projects':
        return <Projects/>;
      case 'experience':
        return <Experience/>;
      case 'contact':
        return <Contact/>;
      default:
        return <Home/>;
    }
  }

  const showNav = () => {
    if (document.getElementById('App').classList.contains('hide')) {
      document.getElementById('App').classList.remove('hide');
    } else {
      document.getElementById('App').classList += 'hide';
    }
  }

  return (
    <Provider store={ store }>
      <div id="App" className="hide">
        <NavBar/>
        <Loading/>
        <div id="half-right">
          <div id="nav-show" onClick={ () => showNav() }>
            <FontAwesomeIcon icon="bars"/>
          </div>
          { page() }
        </div>
      </div>
    </Provider>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));