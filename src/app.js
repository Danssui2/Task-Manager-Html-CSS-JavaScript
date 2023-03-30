import { generateHomepageHTML, init as initHomepage, setTheme } from './homepage.js'
import { getData, initTime, addHandlerTasks } from './model.js'
import { renderStatsHTML, isDesktopView } from './stats.js'
import { openTaskView, generateTaskView } from './viewTask.js'
import { generateAddTaskHTML } from './createTask.js';

import './styles/main.css';
import './styles/themes.css';

//load the data from localStorage as soon as page loads
getData();

function generateMarkup() {
  generateHomepageHTML();
  generateAddTaskHTML();
  generateTaskView();
  renderStatsHTML();
  initHomepage();
  initTime();

  //initialize the listener when the page loads
  addHandlerTasks(openTaskView);
  //load theme
  setTheme();

  //check if desktop
  isDesktopView();
}

function init() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
      .then(registration => {
        console.debug('Service worker registered', registration);
      })
      .catch(err => console.error('Service worker registration failed ', err))
  } else {
    console.error('Service worker not supported');
  }


  generateMarkup();
}

init();