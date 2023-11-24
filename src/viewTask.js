import icons from './assets/icons.svg'
import { statsData, taskArray, currid, renderTasks, setLocalStorage, messagePopUp } from './model.js'

const parentElement = document.querySelector('.task-view');

let actionBtnsCont;

export function generateTaskView() {
  const html = `
    <button id="closeViewBtn">&times;</button>
    <div class="task-form-view">
    
    </div>`

  parentElement.insertAdjacentHTML('beforeend', html);
  document.querySelector('#closeViewBtn').addEventListener('click', closeTask);
}

export function openTaskView(data) {
  const { taskname, taskdesc, category, timestart, timeend, uid, isCompleted } = data;

  const html = `
    <h2>Task Description</h2>
      <div class='svg_cont'>
        <svg>
          <use xlink:href='${icons}#icon-${category}'></use>
        </svg>
      </div>
      <div class="task_info_cont">
        <h3>${taskname}</h3>
        <p class="task_view_desc">${taskdesc}</p>
      </div>
      
      <div class="task-form-view-details">
        <div class='task-form-view-category'>
          <svg>
            <use xlink:href='${icons}#icon-category'></use>
          </svg>
          <p>Category : ${category} </p>
        </div>
        
        <div class='time-input-start-cont'>
          <svg>
            <use xlink:href='${icons}#icon-clock'></use>
          <svg>
          
          <div>
            <p>Start</p>
            <p>${timestart}</p>
          </div>
        </div>
        
        <div class='time-input-end-cont'>
          <svg>
            <use xlink:href='${icons}#icon-clock'></use>
          <svg>
          
          <div>
            <p>End</p>
            <p>${timeend}</p>
          </div>
        </div>

        <div data-task-id="${uid}" class="action_button_cont">
          <button id="taskComplete">Complete</button>
          <button id="taskDelete">Delete</button>
        </div>
      </div>`;

  const taskViewForm = document.querySelector('.task-form-view');

  //clear the form
  taskViewForm.innerHTML = '';

  taskViewForm.insertAdjacentHTML('beforeend', html);

  parentElement.classList.add('active');

  const completeBtn = parentElement.querySelector(".action_button_cont #taskComplete");

  if (isCompleted === false) completeBtn.style.display = "block";
  else completeBtn.style.display = "none";

  addHandlerCompleteTask(getBtnAction);
}

function addHandlerCompleteTask(handler) {
  const actionBtnsCont = document.querySelector('.action_button_cont');
  actionBtnsCont.addEventListener('click', handler);
}

function getBtnAction(e) {
  const uniqueid = e.target.closest('.action_button_cont').dataset.taskId;

  const btnType = e.target.id;
  CompleteDeleteTask(uniqueid, btnType);
}

export function closeTask() {
  parentElement.classList.remove('active');
}

function CompleteDeleteTask(uniqueid, btnType) {
  const currDate = taskArray.find(task => task.date === currid);

  if (currDate) {

    const getUidTask = currDate.content.find(id => id.uid === uniqueid);

    switch (btnType) {
      case 'taskComplete':
        getUidTask.isCompleted = true;
        statsData.complete++;
        statsData.active--;
        messagePopUp('Task marked as completed', 'success');
        break;
      case 'taskDelete':
        getUidTask.isCompleted ? statsData.complete-- : statsData.active--;
        statsData.deleted++;
        messagePopUp('Task deleted', 'danger');
        currDate.content.filter((task, i) => {
          task.uid === getUidTask.uid && currDate.content.splice(i, 1);
        });
        statsData[getUidTask.category] -= 1;
        statsData.total--
        break;
      default:
        return
    }
  }
  renderTasks();
  closeTask();
  setLocalStorage('tasks', taskArray);
  setLocalStorage('stats', statsData);
}