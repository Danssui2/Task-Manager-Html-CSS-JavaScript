import { statsData } from './model.js'
let parentElement = document.querySelector('#stats');
let statsHolder;

export function renderStatsHTML() {
  let html = `
    <h2 class="headertop">Statistics
      <span class="headerbottom">All</span>
    </h2>
    <div class="stats-holder">
    </div>`

  parentElement.insertAdjacentHTML('beforeend', html);
  statsHolder = document.querySelector('.stats-holder');
  generateStats();
}

export function isDesktopView() {
  const width = window.matchMedia('(min-width: 1024px)');

  if (width.matches) {
    const dateMonthSection = document.querySelector('.date-holder');

    dateMonthSection.insertAdjacentElement('beforeend', statsHolder);
  }
}

export function generateStats() {
  const html = `
  <div class="box-holder">
    <div>
      <h1>${statsData.active}</h1>
      <p>Active Task</p>
    </div>
    <div>
      <h1>${statsData.complete}</h1>
      <p>Completed Task</p>
    </div>
    <div>
      <h1>${statsData.total}</h1>
      <p>Total Task</p>
    </div>
    <div>
      <h1>${statsData.deleted}</h1>
      <p>Deleted Task</p>
    </div>
  </div>
  <div class="lower-box">
    <h2 class="lb-head">Category</h2>

    <div class="catbox-holder">
      <span>${statsData.unset}</span>
      <span>${statsData.work}</span>
      <span>${statsData.education}</span>
      <span>${statsData.sport}</span>
      <span>${statsData.social}</span>
      <span>${statsData.entertainment}</span>
    </div>
  </div>`

  statsHolder.innerHTML = '';
  statsHolder.insertAdjacentHTML('beforeend', html);
}
