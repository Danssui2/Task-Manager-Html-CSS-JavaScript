import * as model from './model.js';
import { openTaskView } from './viewTask.js';

const addTaskParentElem = document.querySelector('.create-task');

let categoryBtn;
export let category;
let categoryMenu;
let title;
let desc;
let timeStartInput;
let timeEndInput;
let timeStartElem;
let timeEndElem;

export function generateAddTaskHTML() {
  const html = `
    <button id="closeTaskBtn">&times</button>
    <h2> Create Task </h2>
    
    <form class='task-form'>
    
      <div class='form-input'>
        <label for='taskname'>Task Name</label>
        <input name='taskname' type="text" id="taskname" />
        
        <label for="task-desc">Task Description</label>
        <input name='task-desc' type="text" id="task-desc" />
      </div>

      <div class='cta-cont'>
      
        <div class='category-btn-cont'>
          <button type='button' data-btn="category">
            <svg>
              <use xlink:href='./img/icons.svg#icon-category'></use>
            </svg>
            <b>Category : </b>
          </button>
          <span>Unset</span>
          
          <div class="category_Menu">
            <button type='button'>unset</button>
            <button type='button'>work</button>
            <button type='button'>education</button>
            <button type='button'>sport</button>
            <button type='button'>social</button>
            <button type='button'>entertainment</button>
          </div>
        </div>
        
        <div class='time-input-cont'>
          <svg>
            <use xlink:href='./img/icons.svg#icon-clock'></use>
          <svg>
          
          <div>
            <label for='timestart'>
              Start
            </label>
            <input type="time" id="timestart" value="12:00" />
          </div>
        </div>
        
        <div class='time-input-cont'>
          <svg>
            <use xlink:href='./img/icons.svg#icon-clock'></use>
          <svg>
          
          <div>
            <label for='timeend'>
              End
            </label>
            <input type="time" id="timeend" value="13:00" />
          </div>
        </div>
      </div>
    <button type='submit' id="createTask"> Create New Task </button>
    </form>`


  addTaskParentElem.insertAdjacentHTML('beforeend', html);
  categoryBtn = document.querySelector(`[data-btn="category"]`);
  category = categoryBtn.querySelector('span');
  title = document.getElementById('taskname');
  desc = document.getElementById('taskdesc');
  timeStartInput = document.getElementById('timestart');
  timeEndInput = document.getElementById('timeend');
  categoryMenu = document.querySelector('.category_Menu')
  init();
}

function init() {
  const closeCrossBtn = document.querySelector('#closeTaskBtn');
  const createTaskBtn = document.querySelector('#createTask');

  createTaskBtn.addEventListener('click', createTask);

  closeCrossBtn.addEventListener('click', closeNewtaskPopup);

  document.addEventListener('click', openSelectCategory);
}

function createTask() {
  const dateBtns = document.querySelectorAll(".date button");
  const timeStartEnd = `${timeStartInput.value} — ${timeEndInput.value}`;

  if (title.value === '' || timeStartInput.value >= timeEndInput.value) {
    model.messagePopUp(`Important!
    1. Title Cannot Empty.
    
    2. Task start time cannot be greater or equal to task end time.
    
    3.Task end time cannot be lower than task start time.`, 'danger', 2000);

    //reset and close the form
    closeNewtaskPopup();
    return
  }

  model.createNewTask(title.value, desc.value, timeStartInput.value, timeEndInput.value, category.innerText, timeStartEnd);

  model.messagePopUp('Task Created', 'success');

  //reset and close the form
  closeNewtaskPopup();

  // for the newly created tasks;
  model.addHandlerTasks(openTaskView);
}

function closeNewtaskPopup() {
  toggleTaskForm();
  resetAddTaskForm();
}

function resetAddTaskForm() {
  title.value = '';
  desc.value = ''
  category.innerHTML = 'Unset';
  //default values for elements 
  timeStartInput.value = '12:00';
  timeEndInput.value = '13:00'
  timeStartElem.innerText = '12:00';
  timeEndElem.innerText = '13:00';
}

function getInputValue() {
  timeStartInput.addEventListener('input', () => timeStartElem.innerHTML = timeStartInput.value);

  timeEndInput.addEventListener('input', () => timeEndElem.innerHTML = timeEndInput.value);
}

function openSelectCategory(e) {
  
  const btn = e.target.closest('.category-btn-cont');
  
  if (!btn && e.target.closest('.category_Menu') != null) {
    if (e.target.matches('button')) category.innerHTML = e.target.innerText;
  }

  if (btn) categoryMenu?.classList.add('active');
  else closeCategoryMenu();
}

function closeCategoryMenu() {
  categoryMenu?.classList.remove('active');
}

export function toggleTaskForm() {
  addTaskParentElem.classList.toggle('active');
  getInputValue();
}