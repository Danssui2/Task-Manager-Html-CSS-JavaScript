import { messagePopUp, createNewTask, addHandlerTasks } from './model.js';
import { openTaskView } from './viewTask.js';
import icons from './assets/icons.svg';

const addTaskParentElem = document.querySelector('.create-task');

let categoryBtn;
export let selectedCategory;
let categoryMenu;
let formElem;

export function generateAddTaskHTML() {
  const html = `
    <button id="closeTaskBtn">&times</button>
    <h2> Create Task </h2>
    
    <form data-form class='task-form'>
    
      <div class='form-input'>
        <label for='taskname'>Task Name</label>
        <input name='taskname' type="text" id="taskname" />
        
        <label for="taskdesc">Task Description</label>
        <input name='taskdesc' type="text" id="taskdesc" />
      </div>

      <div class='cta-cont'>
      
        <div class='category-btn-cont'>
          <button type='button' data-btn="category">
            <svg>
              <use xlink:href='${icons}#icon-category'></use>
            </svg>
            <b>Category : </b>
          </button>
          <span data-category-span>Unset</span>
          
          <div class="category_Menu">
            <button class='category' type='button'>unset</button>
            <button class='category' type='button'>work</button>
            <button class='category' type='button'>education</button>
            <button class='category' type='button'>sport</button>
            <button class='category' type='button'>social</button>
            <button class='category' type='button'>entertainment</button>
          </div>
        </div>
        
        <div class='time-input-cont'>
          <svg>
            <use xlink:href='${icons}#icon-clock'></use>
          <svg>
          
          <div>
            <label for='timestart'>
              Start
            </label>
            <input type="time" id="timestart" value="12:00" name="timestart" />
          </div>
        </div>
        
        <div class='time-input-cont'>
          <svg>
            <use xlink:href='${icons}#icon-clock'></use>
          <svg>
          
          <div>
            <label for='timeend'>
              End
            </label>
            <input type="time" id="timeend" value="13:00" name="timeend" />
          </div>
        </div>
      </div>
    <button type='submit' id="createTask"> Create New Task </button>
    </form>`


  addTaskParentElem.insertAdjacentHTML('beforeend', html);
  categoryBtn = document.querySelector(`[data-btn="category"]`);
  selectedCategory = document.querySelector('[data-category-span]');
  categoryMenu = document.querySelector('.category_Menu');
  formElem = document.querySelector('[data-form]');

  init();
}

function init() {
  const closeCrossBtn = document.querySelector('#closeTaskBtn');

  formElem.addEventListener('submit', e => {
    e.preventDefault();
    const fd = [...new FormData(formElem)];
    const fdObj = Object.fromEntries(fd);
    createTask({ ...fdObj, category: selectedCategory.textContent.toLowerCase() })
  });

  closeCrossBtn.addEventListener('click', closeNewtaskPopup);

  document.addEventListener('click', openCategoriesMenu);
}

function createTask(data) {
  const dateBtns = document.querySelectorAll(".date button");
  const { taskname, timestart, timeend } = data;
  const time = `${timestart} — ${timeend}`;

  if (taskname === '' || timestart >= timeend) {
    messagePopUp(`Important!
    1. Title Cannot Empty.
    
    2. Task start time cannot be greater or equal to task end time.
    
    3.Task end time cannot be lower than task start time.`, 'danger', 4000);

    //reset and close the form
    closeNewtaskPopup();
    return
  }

  createNewTask({ time, ...data });

  messagePopUp('Task Created', 'success');

  //reset and close the form
  closeNewtaskPopup();

  // for the newly created tasks;
  addHandlerTasks(openTaskView);
}

function closeNewtaskPopup() {
  resetAddTaskForm();
  toggleTaskForm();
}

function resetAddTaskForm() {
  selectedCategory.innerHTML = 'Unset';

  //reset form
  formElem.reset();
}

function openCategoriesMenu(e) {

  const btn = e.target.closest('.category-btn-cont');

  if (btn && e.target.closest('.category_Menu') != null) {
    selectedCategory.innerHTML = e.target.innerText;
    closeCategoryMenu();
    return
  }

  if (btn) categoryMenu?.classList.add('active');
  else closeCategoryMenu();
}

function closeCategoryMenu() {
  categoryMenu?.classList.remove('active');
}

export function toggleTaskForm() {
  addTaskParentElem.classList.toggle('active');
}