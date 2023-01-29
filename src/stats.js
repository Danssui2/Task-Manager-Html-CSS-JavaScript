import { statsData } from './model.js';
import icons from '../img/icons.svg';

let parentElement = document.querySelector('#stats');
let statsHolder;

export function renderStatsHTML() {
  let html = `
    <h2 class="stats-heading">Statistics
      <span>All</span>
    </h2>
    ${generateStats()}`

  parentElement.insertAdjacentHTML('beforeend', html);
}

export function isDesktopView() {
  const width = window.matchMedia('(min-width: 90em)');

  if (width.matches) {
    const dateHolder = document.querySelector('.date-holder');

    dateHolder.insertAdjacentElement('beforeend', parentElement);
  }
}

function generateStats() {
  return `
  
    <div class="box-holder">
    ${activeTasksMarkup()}
    </div>
    
    <div class="lower-box">
      <h2 class="categories-heading">Category</h2>
    
      <div class="categories-cont">
        <div>
          <svg>
            <use xlink:href='${icons}#icon-unset'></use>
          </svg>
          <span data-stats='unset'>${statsData.unset}</span>
        </div>
        <div>
          <svg>
            <use xlink:href='${icons}#icon-work'></use>
          </svg>
        <span data-stats='work'>${ statsData.work }</span>
        </div>
        <div>
          <svg>
            <use xlink:href='${icons}#icon-education'></use>
          </svg>
        <span data-stats='education'>${ statsData.education }</span>
        </div>
        <div>
          <svg>
            <use xlink:href='${icons}#icon-sport'></use>
          </svg>
        <span data-stats='sport'>${ statsData.sport }</span>
        </div>
        <div>
          <svg>
            <use xlink:href='${icons}#icon-social'></use>
          </svg>
        <span data-stats='social'>${ statsData.social }</span>
        </div>
        <div>
          <svg>
            <use xlink:href='${icons}#icon-entertainment'></use>
          </svg>
        <span data-stats='entertainment'>${ statsData.entertainment }</span>
        </div>
      </div>
    </div>`
}

function activeTasksMarkup() {
  let html = '';
  for (let key in statsData) {
    if (key === 'active' || key === 'complete' || key === 'total' || key === 'deleted') html += `<div>
                <h1 data-stats='${key}'>${statsData[key]}</h1>
                <p>${key} Task</p>
              </div>`
  }
  return html
}

export function updateStats() {
  const statsElems = document.querySelectorAll('[data-stats]');

  statsElems.forEach(elem => {
    elem.textContent = statsData[elem.dataset.stats];
  })
}