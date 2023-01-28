//Created by DanssUiDanssUi
import * as homepage from './homepage.js'
import * as model from './model.js'
import * as stats from './stats.js'
import * as viewTask from './viewTask.js'
import { generateAddTaskHTML } from './createTask.js'

//load the data from localStorage as soon as page loads
model.getData();

function generateMarkup() {
  homepage.generateHomepageHTML();
  generateAddTaskHTML();
  viewTask.generateTaskView();
  stats.renderStatsHTML();
  homepage.init();
  model.initTime();

  //initialize the listener when the page loads
  model.addHandlerTasks(viewTask.openTaskView);
  //load theme
  homepage.setTheme();

  //check if desktop
  stats.isDesktopView();
}

function init() {
  generateMarkup();
}

init();