const FRONT = process.env.REACT_APP_FRONT_URL;
const BACK = process.env.REACT_APP_BACK_URL;

const general = {
  /**
   *
   * URL
   *
   */
  makePath: (params, back) => (back ? BACK : FRONT) + '/' + params.join('/'),

  getLink: () => window.location.pathname.substr(1).split('/'),

  getParams: () => {
    var url = window.location.search.substr(1).split('&');

    var params = {};

    url.forEach(item => {
      let temp = item.split('=');

      params[temp[0]] = temp[1];
    });

    return params;
  },
  /**
   *
   * Tab
   *
   */
  redirect: to => window.location.href = general.makePath(to.filter(a => a)),

  newTab: to => window.open(general.makePath(to.filter(a => a))),
  /**
   *
   * Loading
   *
   */
  addLoading: () => {
    if (process.env.REACT_APP_LOADING === "true") {
      document.getElementById('loading').classList.remove('hide')
    }
  },

  removeLoading: () => {
    if (process.env.REACT_APP_LOADING === "true") {
      document.getElementById('loading').classList += ' hide';
    }
  },
  /**
   *
   * Etc
   *
   */
  getYear: () => new Date().getFullYear(),

  between: (item, min, max) => {
    if (item >= min && item <= max) return true;
    else return false;
  },

  fisrtToUpper: text => {
    let words = text.split(' ');
    let formatted = [];

    words.forEach(word => formatted.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))

    return formatted.join(' ')
  },

  showError: msg => {

  }
};

module.exports = general;