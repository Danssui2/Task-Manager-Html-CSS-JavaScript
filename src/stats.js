import { statsData } from './model.js'
let parentElement = document.querySelector('#stats');
let statsHolder;

export function renderStatsHTML() {
  let html = `
    <h2 class="stats-heading">Statistics
      <span>All</span>
    </h2>
    <div class="stats-holder">
    </div>`

  parentElement.insertAdjacentHTML('beforeend', html);
  statsHolder = document.querySelector('.stats-holder');
}

export function isDesktopView() {
  const width = window.matchMedia('(min-width: 1024px)');

  if (width.matches) {
    const dateMonthSection = document.querySelector('.date-holder');

    dateMonthSection.insertAdjacentElement('beforeend', parentElement);
  }
}

function activeTasksMarkup() {
  let html = '';
  for (let key in statsData) {
    if (key === 'active' || key === 'complete' || key === 'total' || key === 'deleted') html += `<div>
                  <h1>${statsData[key]}</h1>
                  <p>${key} Task</p>
                </div>`
  }
  return html
}


export function generateStats() {
  activeTasksMarkup()
  const html = `
  <div class="box-holder">
  ${activeTasksMarkup()}
  </div>
  <div class="lower-box">
    <h2 class="categories-heading">Category</h2>

    <div class="categories-cont">
      <span>
        <svg>
          <use xlink:href='./img/icons.svg#icon-unset'></use>
        </svg>
        ${statsData.unset}
      </span>
      <span>
        <svg>
          <use xlink:href='./img/icons.svg#icon-work'></use>
        </svg>
      ${ statsData.work }
      </span>
      <span>
        <svg>
          <use xlink:href='./img/icons.svg#icon-education'></use>
        </svg>
      ${ statsData.education }
      </span>
      <span>
        <svg>
          <use xlink:href='./img/icons.svg#icon-sport'></use>
        </svg>
      ${ statsData.sport }
      </span>
      <span>
        <svg>
          <use xlink:href='./img/icons.svg#icon-social'></use>
        </svg>
      ${ statsData.social }
      </span>
      <span>
        <svg>
          <use xlink:href='./img/icons.svg#icon-entertainment'></use>
        </svg>
      ${ statsData.entertainment }
      </span>
    </div>
  </div>`

  statsHolder.innerHTML = '';
  statsHolder.insertAdjacentHTML('beforeend', html);
}