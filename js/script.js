let tasks = [];
let hideDoneTasks = false; //done tasks should not be hidden

const addNewTask = (newTaskContent) => {
	tasks = [...tasks, {content: newTaskContent}];
	//tasks.push({ content: newTaskContent });

	render();
};

const removeTask = (taskIndex) => {
	tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
	//creating a table from beginning to removed index and after removing index to the end
	//tasks.splice(taskIndex, 1);
	//every delete button will be deleting other task thanks to the index value
	render();
};

const toggleTaskDone = (taskIndex) => {
	tasks = [
		...tasks.slice(0, taskIndex),
		{...tasks[taskIndex], done: !tasks[taskIndex].done},
		...tasks.slice(taskIndex + 1),
	];
	//tasks[taskIndex].done = !tasks[taskIndex].done; //catching the task index and creating opposite property

	render();
};

const markAllTasksDone = () => {
	//selecting all tasks as done
	tasks = tasks.map((task) => ({
		...task,
		done: true,
	}));
	render();
};

let toggleHideDoneTasks = () => {
	//changing the display of done tasks
	hideDoneTasks = !hideDoneTasks;
	render();
};

const bindRemoveEvents = () => {
	const removeButtons = document.querySelectorAll('.js-remove'); //creating the delete button, catching all button with js-remove class
	//console.log(removeButtons); //NodeList, similar to table, for checking
	removeButtons.forEach((removeButton, index) => {
		//removeButton is a button and index is it loc that is  transferred to remove task function
		removeButton.addEventListener('click', () => {
			removeTask(index);
		});
	});
};

const bindToggleDoneEvents = () => {
	const toggleDoneButtons = document.querySelectorAll('.js-done');
	toggleDoneButtons.forEach((toggleDoneButton, index) => {
		toggleDoneButton.addEventListener('click', () => {
			toggleTaskDone(index);
		});
	});
};

const renderTasks = () => {
	//let tasksListHTMLContent = ""; //at the beginning is a empty string chain

	//for (const task of tasks) {
	//using for of loop we do an iteration on every task of tasks and an adding, here the indexes does not matter
	//tasksListHTMLContent += `
	const tasksToHTML = (task) => `
                   <li 
                      class="tasks__item${
												task.done && hideDoneTasks
													? ' tasks__item--hidden'
													: ' '
											} js-task"
                    >

                      <button class="tasks__button tasks__button--done js-done">
                        ${task.done ? '✅' : ' '}
                      </button>

                      <span class="${task.done ? 'tasks__content--done' : ''}">
                        ${task.content}
                      </span>

                      <button class="tasks__button tasks__button--remove js-remove">
                        🗑 
                      </button>
                   
                    </li>
       `; //creating a line through decoration for done tasks and sticking a delete button to each task
	const tasksElement = document.querySelector('.js-tasks');
	tasksElement.innerHTML = tasks.map(tasksToHTML).join(' ');
};
//document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent; // string is putted do the task list
//the js-tasks is replaced by the htmlString values which was iterated

document.querySelector('.js-stats').innerText = `
       Total number of tasks: ${tasks.length}\n
       Total number of finished tasks: ${
					tasks.filter((task) => task.done).length
				}
     `;

//bindRemoveEvents();
//bindToggleDoneEvents();

const renderButtons = () => {
	const buttonsElement = document.querySelector('.js-buttons');

	//if there are no tasks nothing will be written in buttonsElement
	if (!tasks.length) {
		buttonsElement.innerHTML = '';
		return;
	}

	//case if there are some tasks and the changing text element in button
	//disabled if all task are done
	buttonsElement.innerHTML = `
    <button class = "buttons__button js-toggleHideDoneTasks" ${
			tasks.every(({done}) => !done) ? 'disabled' : ''
		}>
      ${hideDoneTasks ? 'Show' : 'Hide'} done tasks
    </button>
    <button class ="buttons__button js-markAllDone"
      ${tasks.every(({done}) => done) ? 'disabled' : ''}
      >
        Select all as done 
      </button>
    `;
};

const bindButtonsEvents = () => {
	const markAllDoneButton = document.querySelector('.js-markAllDone');
	//render of the buttons when the list isn't empty
	if (markAllDoneButton) {
		markAllDoneButton.addEventListener('click', markAllTasksDone);
	}
	const toggleHideDoneTasksButton = document.querySelector(
		'.js-toggleHideDoneTasks'
	);
	if (toggleHideDoneTasksButton) {
		toggleHideDoneTasksButton.addEventListener('click', toggleHideDoneTasks);
	}
};

const render = () => {
	renderTasks();
	bindRemoveEvents();
	bindToggleDoneEvents();
	renderButtons();
	bindButtonsEvents();
};

const onFormSubmit = (event) => {
	event.preventDefault();
	const newTaskContent = document.querySelector('.js-newTask').value.trim();
	//manipulation the task content, trimming the white symbols outside the task

	if (newTaskContent === '') {
		return;
		//do nothing is the string chain is empty
	}

	addNewTask(newTaskContent);
	//function call addNewTask
	const inputCleaner = document.querySelector('.js-newTask');
	inputCleaner.value = '';
};

const init = () => {
	render();
	const form = document.querySelector('.js-form');
	//form for adding new tasks
	form.addEventListener('submit', onFormSubmit);
	//function call onFormSubmit on "submit"
};

init();
